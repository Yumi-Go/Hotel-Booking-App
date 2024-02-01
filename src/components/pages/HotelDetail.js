import styled from "@emotion/styled";
import { Box, Grid, Paper, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import searchRequest from "../../hooks/useSearchAPI";



// this page is for multiple offers from single hotel
export default function HotelDetail() {

  const [searchConditions, setSearchConditions] = useState({
    hotelId: "MCLONGHM",
    adults: 2,
    children: 0,
    checkInDate: '2024-05-22',
    checkOutDate: '2024-05-23',
    roomQuantity: 1,
    priceRange: "100-800",
    currency: "EUR"
  });
  const [offers, setOffers] = useState([]); // [ { hotel(+photos) }, [ {offer 1}, {offer 2}, {offer 3}, ... ] ]
  const [photos, setPhotos] = useState([]); // [ { hotel(+photos) + offer }, { hotel(+photos) + offer }, ... ]




  async function search() {
    try {
      // searchResult should be the array of objects like this
      // [ { hotel(+photos) }, [ {offer 1}, {offer 2}, {offer 3}, ... ] ]
      const searchResult = await searchRequest(searchConditions);
      console.log("searchResult in Home: ", searchResult);
      setOffers(searchResult);
    } catch (error) {
      console.error("Error in useEffect: ", error);
    }
  }

  useEffect(() => {
    if (offers.length > 0) {
      console.log("offers updated: ", offers);
      const hotelObj = offers[0];
      // console.log("hotelObj: ", hotelObj);
      // setPhotos(hotelObj.photoUrls); // 10 photos for each hotel.. when offers from single hotel should be shown (this will be used in hotel detail page)
      const singlePhoto = [hotelObj.photoUrls[0]]; // single photo for each hotel.. when offers from multiple hotels should be shown
      setPhotos(singlePhoto);
    }
  }, [offers]);

  
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
              Array.isArray(photos) && photos.map((photo, index) => (
                <Grid item xs={2} sm={3} md={3} key={index}>
                  <Item>
                      <img src={photo} alt={`hotel ${index}`} style={{ maxWidth: '100%', height: '100%' }} />
                  </Item>
                </Grid>
              ))
            }
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}
