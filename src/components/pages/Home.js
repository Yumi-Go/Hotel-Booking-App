import styled from "@emotion/styled";
import { Box, Grid, Paper } from "@mui/material";
import { useEffect } from "react";
// import amadeus from "../../amadeusConfig";
// import useAuth from "../../hooks/useAuth";


// amadeus.shopping.hotelOffersSearch
// .get({
//     hotelIds: 'RTPAR001',
//     adults: '2'
// })
// .then(function(response) {
//     console.log(response.data);
// }).catch(function(responseError) {
//     console.log(responseError.code);
// });








export default function Home() {


  const getToken = () => {
    fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "grant_type=client_credentials&client_id=8MEG3LPspvqB3GoiWYfEibC4N4nZoBOD&client_secret=o1bK1JjBi39gIFDW",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data.access_token: ", data.access_token);
        fetch(
          "https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=MCLONGHM&adults=1&checkInDate=2024-11-22&roomQuantity=1",
          {
            method: "GET",
            headers: {
              Authorization: 'Bearer Fkg7XwwpW4SS0JDoWjhXuWAKRACV',
            },
          }
        )
          .then((res) => res.json())
          .then((datas) => {
            if (datas.data.length) {
              console.log("datas: ", datas);
            }
          })
          .catch((err) => console.error("2", err));
      })
      .catch((err) => console.error("1", err));
  };




  useEffect(() => {
    getToken();
  }, []);













    // const { currentUser, logOut } = useAuth();
    const Item = styled(Paper)(() => ({
        backgroundColor: 'pink',
        padding: '10px',
        height: '200px',
        textAlign: 'center',
    }));


    return (
        <Box sx={{ width: "100%", display:"flex", position: "absolute", justifyContent: 'center'}}>
            <Box
                sx={{ display:"flex", justifyContent: 'center', alignItems: 'center', bgcolor: '#dedede', margin: 0, padding: 0 }}
            >
                {/* <h1>This is Home!</h1>
                {
                    currentUser ?
                    <div>
                        <h4>Name: {currentUser?.fName} / Email: {currentUser?.email} / User ID: {currentUser?.uid} / Phone Number: {currentUser?.pNum}</h4>
                        <button onClick={()=>logOut()}>Log Out</button>
                    </div>
                    : ""
                } */}

                <Box sx={{ width: "95%", my: "20px", bgcolor: "red" }}>
                    <Grid container padding="20px" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {Array.from(Array(20)).map((_, index) => (
                            <Grid item xs={2} sm={3} md={3} key={index}>
                                <Item>Hotel</Item>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}
