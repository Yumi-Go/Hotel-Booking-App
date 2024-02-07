import styled from "@emotion/styled";
import { Box, Grid, Paper, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import searchRequest from "../../hooks/useHotelAPI";
import {getOffers} from "../../hooks/useHotelAPI";


// search result (single item for each hotel from multiple hotels)
export default function Home() {

  const [searchConditions, setSearchConditions] = useState({
    hotelId: ["MCLONGHM", "HNPARKGU"], // multiple hotels available.. for single hotel just ["MCLONGHM"]
    adults: 2,
    children: 0,
    checkInDate: '2024-05-22',
    checkOutDate: '2024-05-23',
    roomQuantity: 1,
    priceRange: "100-800",
    currency: "EUR"
  });
  const [searchResult, setSearchResult] = useState([]); // [{ ...hotel, photoUrls: [url1, url2..], offers: [{offer1},{offer2}..] }, { ...hotel, photoUrls: [url1, url2..], offers: [{offer1},{offer2}..] }, ...]
  const [photos, setPhotos] = useState([]);


  async function search() {
    try {
      // response should be the array of objects like this
      // [{ ...hotel, photoUrls: [url1, url2..], offers: [{offer1},{offer2}..] }, { ...hotel, photoUrls: [url1, url2..], offers: [{offer1},{offer2}..] }, ...]
      const response = await getOffers(searchConditions);
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
        <button onClick={()=>search()}>Search</button>
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
