import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Title from "../../reusableComponents/Title";
import Availability from "./Availability";
import Ratings from "./Ratings";
import Photos from "./Photos";
import Map from "./Map";

const Item = styled(Box)(({ theme }) => ({
    padding: 0,
    textAlign: 'center',
    backgroundColor: 'transparent',
    height: 'auto',
    boxShadow: 0,
  }));

// export default function HotelDetail({ hotelObj, ratings }) { // make hotelObj, ratings single parameter merged later...
export default function HotelDetail() { // make hotelObj, ratings single parameter merged later...
    
    const location = useLocation();
    const hotelObj = location.state?.hotelObj; // Passing data between pages with useLocation and useNavigate from Home.js

    console.log("hotelObj in HotelDetail.js (from Home.js): ", hotelObj);


    // // for testing getPhotosByHotelName.. remove this later
    // const [photos, setPhotos] = useState([]);

    // useEffect(() => {
    //     const fetchPhotos = async () => {
    //         try {
    //             const photoUrls = await getPhotosByHotelName(hotelObj.hotel.name);
    //             setPhotos(photoUrls);
    //             // console.log("photoUrls: ", photoUrls);
    //         } catch (error) {
    //             console.error("Failed to fetch photos:", error);
    //         }
    //     };
    //     fetchPhotos();
    // }, [hotelObj.hotel.name]);


  return (
    <>
    <Title title={hotelObj.name} />
    <Box sx={{ width: "100%", height: "auto", display:"flex", position: "absolute", justifyContent: 'center'}}>
        <Stack sx={{ width: "100%", alignItems: 'center', bgcolor: '#dedede', margin: 0, padding: 0 }}>
            {/* <Box>
                <h1>{hotelObj.name}</h1>
            </Box> */}
            <Box sx={{ width: "95%", height: "auto", my: "20px" }}>
                <Grid container spacing={0} sx={{ width: '100%' }}>
                    <Grid item xs={6} md={7} sx={{ height: 500, py: 2, px: 0 }}>
                        <Item sx={{ height: "100%", padding: 0, margin: 0 }}>
                            <Photos hotelObj={hotelObj} />
                        </Item>
                    </Grid>

                    <Grid item xs={6} md={5} sx={{ py: 2 }}>
                        <Item sx={{ height: '100%', padding: 0 }}>
                            <Map hotelObj={hotelObj} />
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={8} sx={{ height: 'auto', boxShadow: 0, bgcolor: 'white', py: 2 }}>
                        <Item sx={{ boxShadow: 0 }}>
                            <Availability offersObj={hotelObj.offers} />
                        </Item>
                    </Grid>
                    <Grid item xs={0.1} md={0.1} sx={{ height: 'auto', boxShadow: 0 }}>

                    </Grid>
                    <Grid item xs={5.9} md={3.9} sx={{ height: 'auto', boxShadow: 0, bgcolor: 'white' }}>
                        <Item sx={{ boxShadow: 0, border: 0 }}>
                            <Ratings ratings={hotelObj.ratings} />
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    </Box>
    </>
  );
}
