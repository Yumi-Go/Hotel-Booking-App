import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { getPhotosByHotelName, getRatingsByHotelId } from '../../hooks/useHotelAPI';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function HotelDetail({ hotelObj, ratings }) {
    console.log("Received hotelObj: ", hotelObj);
    console.log("Received ratings: ", ratings);



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
    <Box sx={{ width: "100%", height: "100%", display:"flex", position: "absolute", justifyContent: 'center'}}>
      <Stack sx={{ width: "100%", alignItems: 'center', bgcolor: '#dedede', margin: 0, padding: 0 }}>
        <Box>
            <h1>
                {hotelObj.hotel.name}
            </h1>

        </Box>
        <Box sx={{ width: "95%", my: "20px", bgcolor: "red" }}>
            <Grid container spacing={2}>
                <Grid xs={6} md={7} sx={{ height: 500, padding: 2 }}>
                    <Item sx={{ height: "100%", bgcolor: "pink"}}>
                        <ImageList sx={{ width: "100%", height: "100%", margin: 0, padding: 0 }}>
                            {/* <ImageListItem key="Subheader" cols={2}>
                                <ListSubheader component="div">Photos</ListSubheader>
                            </ImageListItem> */}
                            {Object.values(hotelObj.photoUrls)[0].map((url, index) => (
                                <ImageListItem key={index}>
                                    <img
                                        src={url}
                                        alt={index}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={hotelObj.hotel.name}
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${hotelObj.hotel.name}`}
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        }
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Item>
                </Grid>
                <Grid xs={6} md={5} sx={{ padding: 2 }}>
                    <Item sx={{ height: '100%', bgcolor: "pink" }}>
                        <iframe
                            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_FIREBASE_API_KEY}&q=place_id:ChIJZcFL1TMFdkgRZcciwfX0gr0`}
                            style={{ width: "100%", height: "100%", border: "0" }}
                            title="map"
                            allowFullScreen
                        />
                    </Item>
                </Grid>
                <Grid xs={6} md={4}>
                    <Item>Available roome list here!!</Item>
                </Grid>
                <Grid xs={6} md={8}>
                    <Item>something else...</Item>
                </Grid>
                <Grid xs={6} md={4}>
                    <Item>Detailed information!!</Item>
                </Grid>
                <Grid xs={6} md={8}>
                    <Item>



                    {ratings ? (
                  <div>
                    {Object.entries(ratings).map(([key, value]) => (
                      <div key={key}>
                        {key}: {JSON.stringify(value)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>Loading ratings...</div> // Placeholder while loading
                )}





                    </Item>
                </Grid>
            </Grid>
        </Box>
      </Stack>
    </Box>
  );
}
