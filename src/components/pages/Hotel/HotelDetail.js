import { useEffect } from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Availability from "./Availability";
import Ratings from "./Ratings";
import Photos from "./Photos";
import Map from "./Map";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  

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
                    <Grid item xs={6} md={7} sx={{ height: 500, py: 2, px: 0, mx: 0 }}>
                        <Item sx={{ height: "100%", padding: 0, margin: 0, bgcolor: "pink"}}>
                            <Photos hotelObj={hotelObj} />
                        </Item>
                    </Grid>

                    <Grid item xs={6} md={5} sx={{ py: 2, px: 0, mx: 0, backgroundColor: 'blue' }}>
                        <Item sx={{ height: '100%', bgcolor: "pink", padding: 0 }}>
                            <Map hotelObj={hotelObj} />
                        </Item>
                    </Grid>

                    <Grid item xs={6} md={8} sx={{ py: 2, px: 0, mx: 0, backgroundColor: 'orange' }}>
                        <Item sx={{ boxShadow: 0 }}>
                            <Availability hotelObj={hotelObj} />
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={4} sx={{ py: 2, px: 0, mx: 0, backgroundColor: 'green' }}>
                        <Item sx={{ boxShadow: 0, border: 1, backgroundColor: "purple" }}>
                            <Ratings ratings={ratings} />
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    </Box>
  );
}
