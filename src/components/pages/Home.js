import styled from "@emotion/styled";
import { Box, Grid, Paper, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { getIds, searchHotels } from "../../hooks/useHotelAPI";


// search result (single item for each hotel from multiple hotels)
export default function Home() {

  // [{ ...hotel, photoUrls: [url1, url2..], offers: [{offer1},{offer2}..] }, { ...hotel, photoUrls: [url1, url2..], offers: [{offer1},{offer2}..] }, ...]
  const [searchResult, setSearchResult] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [cityCode, setCityCode] = useState("PAR"); // hard coded for testing.. remove later
  const [name, setName] = useState("CITADINES"); // hard coded for testing.. remove later


  // const hotelIds = await getIds(name, cityCode);
  const [searchConditions, setSearchConditions] = useState({
    hotelIds: ["MCLONGHM", "HNPARKGU"], // multiple hotels available.. if it is single hotel, just ["MCLONGHM"]
    adults: 2,
    children: 0,
    checkInDate: '2024-05-22',
    checkOutDate: '2024-05-23',
    roomQuantity: 1,
    priceRange: "100-1200",
    currency: "EUR"
  });


  // searchClick() 해결될 때까지 무시하기!
  async function cityClick() {
    try {

      // Hotel List API
      // e.g. https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=PAR&radius=5&radiusUnit=KM&hotelSource=ALL
      // const url = "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=PAR&radius=5&radiusUnit=KM&hotelSource=ALL";

      const url =
      "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?" +
      `cityCode=${cityCode}&` +
      "radius=5&" +
      "radiusUnit=KM&" +
      "hotelSource=ALL";

      console.log("name: ", name);
      
      // response should be the array of objects like this
      // [ { ...hotel }, { ...hotel }, { ...hotel } ... ]
      const response = await searchHotels(url);
      console.log("City searchResult in Home: ", response);
      setSearchResult(response); // Assuming response structure is correct
      setPhotos(response.map(hotel => hotel.photoUrls[0]));
      console.log("searchResult updated: ", searchResult);
      console.log("photos updated: ", photos);
    } catch (error) {
      console.error("Error in search(): ", error);
    }
  }



  // 지금 이거 하는 중..
  // 현재 잘 작동함. 하지만 만약 city나 name 설정된거 있으면 그 결과 안에서 이게 실핼되도록 해야 함.
  async function searchClick() {
    try {

      // const hotelIds = searchConditions.hotelIds.join("%2C"); // multiple hotels.. seperated by '%2C' like this.. e.g. hotelIds=MCLONGHM%2CHNPARKGU
      const ids = await getIds(name, cityCode);
      const hotelIds = ids.join("%2C"); // multiple hotels.. seperated by '%2C' like this.. e.g. hotelIds=MCLONGHM%2CHNPARKGU
      console.log("aggregated hotelIds: ", hotelIds);

      // Hotel Search API
      const url =
      "https://test.api.amadeus.com/v3/shopping/hotel-offers?" +
      `hotelIds=${hotelIds}&` +
      `adults=${searchConditions.adults}&` +
      `checkInDate=${searchConditions.checkInDate}&` +
      `checkOutDate=${searchConditions.checkOutDate}&` +
      `roomQuantity=${searchConditions.roomQuantity}&` +
      `priceRange=${searchConditions.priceRange}&` +
      `currency=${searchConditions.currency}&` +
      "paymentPolicy=NONE&" +
      "bestRateOnly=false";

      // response should be the array of objects like this
      // [{ ...hotel, photoUrls: [url1, url2..], offers: [{offer1},{offer2}..] }, { ...hotel, photoUrls: [url1, url2..], offers: [{offer1},{offer2}..] }, ...]
      const response = await searchHotels(url);
      console.log("searchResult in Home: ", response);
      setSearchResult(response); // Assuming response structure is correct
      setPhotos(response.map(hotel => hotel.photoUrls[0]));
      console.log("searchResult updated: ", searchResult);
      console.log("photos updated: ", photos);
    } catch (error) {
      console.error("Error in search(): ", error);
    }
  }

  const { currentUser, logOut } = useAuth();
  const Item = styled(Paper)(() => ({
      backgroundColor: 'pink',
      padding: '10px',
      height: '200px',
      textAlign: 'center',
  }));


  return (
    <Box sx={{ width: "100%", display:"flex", position: "absolute", justifyContent: 'center'}}>
      <Stack sx={{ alignItems: 'center', bgcolor: '#dedede', margin: 0, padding: 0 }}>
        <button onClick={()=>searchClick()}>Search</button>
        <button onClick={()=>cityClick()}>City</button>

        <Box>
            {
            currentUser ?
            <div>
                <h4>
                Name: {currentUser?.fName} / Email: {currentUser?.email} / User ID: {currentUser?.uid} / Phone Number: {currentUser?.pNum}
                </h4>
                <button onClick={()=>logOut()}>
                Log Out
                </button>
            </div>
            : "No User Logged in"
            }
        </Box>
        <Box sx={{ width: "95%", my: "20px", bgcolor: "red" }}>
          <Grid container padding="20px" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

          {
              Array.isArray(searchResult) && searchResult.length > 0 ?
              searchResult.map((hotel, index) => (
                  <Grid item xs={2} sm={3} md={3} key={index}>
                    <Item>
                      <Box sx={{ height: "40%", display:"flex", justifyContent: 'center'}}>
                        <h4>{hotel.name}</h4>
                      </Box>
                      <Box>
                        <img src={hotel.photoUrls[0]} alt={`hotel ${index}`} style={{ maxWidth: '100%', height: '100%' }} />
                      </Box>
                    </Item>
                  </Grid>
                ))
              : <div>No Search Result</div>
            }

          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}
