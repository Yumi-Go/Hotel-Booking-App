import styled from "@emotion/styled";
import { Box, Grid, Paper } from "@mui/material";
// import useAuth from "../../hooks/useAuth";


export default function Home() {
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
