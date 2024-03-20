import styled from "@emotion/styled";
import { Box, Grid, Paper, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Navigate } from 'react-router-dom';



// search result (single item for each hotel from multiple hotels)
export default function Home({ searchResult }) {

  const { currentUser, logOut } = useAuth();

  const navigate = useNavigate();

  const Item = styled(Paper)(() => ({
      backgroundColor: 'pink',
      padding: '0px',
      margin: '0px',
      height: '300px',
      textAlign: 'center',
  }));

  console.log("Received searchResult: ", searchResult);

  useEffect(() => {
    console.log("searchResult prop updated in Home:", searchResult);
  }, [searchResult]);



  // // for testing Ratings API.. merge ratings to hotelObj later.. after testing
  // useEffect(() => {
  //     const fetchRatings = async() => {
  //         try {
  //             const ratingsData = await getRatingsByHotelId("TELONMFS"); // replace hard-coded parameter with hotelObj.hote.hotelId later..
  //             if (JSON.stringify(ratingsData) !== JSON.stringify(ratings)) {
  //               setRatings(ratingsData);
  //             }
  //             console.log("ratings in App.js: ", ratingsData);
  //         } catch (error) {
  //             console.error("Failed to fetch ratings:", error);
  //         }
  //     };
  //     fetchRatings();
  // }, []);


  const clickHotel = (hotelObj) => {
    navigate("/hotel-detail", { state: { hotelObj } });

} 

  return (
    <Box sx={{ width: "100%", display:"flex", position: "absolute", justifyContent: 'center'}}>
      <Stack sx={{ width: "90%", alignItems: 'center', bgcolor: '#dedede', margin: 0, padding: 0 }}>
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
          <Grid container padding="20px" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ justifyContent: 'center' }}>
          {
          searchResult && searchResult.length > 0 ?
            searchResult.map((hotelObj, index) => (
                <Grid item xs={2} sm={3} md={3} key={index}>
                  <Item onClick={() => clickHotel(hotelObj)} sx={{cursor: 'pointer'}}>
                    <Box sx={{ width: "100%", height: "80%" }}>
                      <img src={Object.values(hotelObj.photoUrls)[0][0]} alt={`hotel ${index}`} style={{ width: '100%', height: '100%' }} />
                    </Box>
                    
                    <Box
                      sx={{ height: "20%", display:"flex", justifyContent: 'center', padding: '10px', margin: '0px' }}>
                      <h4>{hotelObj.name}</h4>
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


