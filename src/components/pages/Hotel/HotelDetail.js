import { useEffect } from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Availability from "./Availability";
import Ratings from "./Ratings";
import Photos from "./Photos";
import Map from "./Map";


export default function HotelDetail({ hotelObj, ratings }) { // make hotelObj, ratings single parameter merged later...
    console.log("Received hotelObj in HotelDetail: ", hotelObj);
    console.log("Received ratings in HotelDetail: ", ratings);

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

    useEffect(() => {
        const rooms = () => {
            for (const [key, value] of Object.entries(hotelObj.offers[0].room)) {
                if (key === "typeEstimated" || key === "description") {
                    console.log(`*** ${key}:`);
                    for (const [k, v] of Object.entries(value)) {
                        console.log(`${k}: ${v}`);
                    }
                }  
            }
        };
        rooms();
    }, [hotelObj]);


  return (
    <Box sx={{ width: "100%", height: "100%", display:"flex", position: "absolute", justifyContent: 'center'}}>
        <Stack sx={{ width: "100%", alignItems: 'center', bgcolor: '#dedede', margin: 0, padding: 0 }}>
            <Box>
                <h1>{hotelObj.hotel.name}</h1>
            </Box>
            <Box sx={{ width: "95%", my: "20px", bgcolor: "red" }}>
                <Grid container spacing={0} sx={{ width: '100%'}}>
                    <Photos hotelObj={hotelObj} />
                    <Map hotelObj={hotelObj} />
                    <Availability hotelObj={hotelObj} />
                    <Ratings ratings={ratings} />
                </Grid>
            </Box>
        </Stack>
    </Box>
  );
}
