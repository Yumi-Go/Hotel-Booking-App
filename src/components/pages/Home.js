import styled from "@emotion/styled";
import { Box, Grid, Paper, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";


// search result (single item for each hotel from multiple hotels)
export default function Home({ searchResult }) {

  const { currentUser, logOut } = useAuth();
  const Item = styled(Paper)(() => ({
      backgroundColor: 'pink',
      padding: '10px',
      height: '200px',
      textAlign: 'center',
  }));

  console.log("Received searchResult: ", searchResult);

  useEffect(() => {
    console.log("searchResult prop updated in Home:", searchResult);
  }, [searchResult]);
  

  return (
    <Box sx={{ width: "100%", display:"flex", position: "absolute", justifyContent: 'center'}}>
      <Stack sx={{ alignItems: 'center', bgcolor: '#dedede', margin: 0, padding: 0 }}>
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

            searchResult && searchResult.length > 0 ?
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
