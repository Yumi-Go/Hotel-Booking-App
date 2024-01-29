import styled from "@emotion/styled";
import { Box, Grid, Paper, Stack } from "@mui/material";
import { useState, useEffect } from "react";
// import amadeus from "../../amadeusConfig";
import useAuth from "../../hooks/useAuth";

export default function Home() {

  const [photos, setPhotos] = useState([]);

  function getPhotosArr(hotelName) {
    const url = 'https://places.googleapis.com/v1/places:searchText';
    try {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({ textQuery: hotelName }),
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.REACT_APP_FIREBASE_API_KEY,
          "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.photos"
        }
      })
      .then(res => res.json())
      .then(res => res.places[0].photos)
      .then(photosArr => {
        console.log("photosArr: ", photosArr);
        setPhotos(photosArr.map(photo => 
          `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=1000&maxWidthPx=1000&key=${process.env.REACT_APP_FIREBASE_API_KEY}`
        ));
        console.log("photos after setPhotos: ", photos);
      })
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const getHotelData = () => {
    
        fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_AMADEUS_CLIENT_ID}&client_secret=${process.env.REACT_APP_AMADEUS_CLIENT_SECRET}`,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data.access_token: ", data.access_token);
            fetch(
              "https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=MCLONGHM&adults=1&checkInDate=2024-11-22&roomQuantity=1",
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${data.access_token}`,
                },
              }
            )
              .then((res) => res.json())
              .then((datas) => {
                if (datas.data.length) {
                  console.log("datas: ", datas.data[0].hotel.name);
                  console.log("hotel name: ", datas.data[0].hotel.name);
                  getPhotosArr(datas.data[0].hotel.name);
                }
              })
              .catch((err) => console.error("2", err));
          })
          .catch((err) => console.error("1", err));
      };

  useEffect(() => {
    getHotelData();
  }, []);



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
              {/* {Array.from(Array(20)).map((_, index) => (
                <Grid item xs={2} sm={3} md={3} key={index}>
                  <Item>Hotel</Item>
                </Grid>
              ))} */}
              {photos.map((photo, index) => (
                <Grid item xs={2} sm={3} md={3} key={index}>
                  <Item>
                    <img src={`${photo}`} alt={`hotel ${index}`} style={{ maxWidth: '100%', height: '100%' }} />
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Box>
    );
}
