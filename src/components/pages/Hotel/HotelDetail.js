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
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" value={props.value} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }


  function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={props.value} sx={{height: 10}} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">
                {`${Math.round(props.value)}%`}
            </Typography>
        </Box>
      </Box>
    );
  }



// 나중에 컴포넌트 좀 분리하기!
export default function HotelDetail({ hotelObj, ratings }) { // make hotelObj, ratings single parameter merged later...
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
            <h1>
                {hotelObj.hotel.name}
            </h1>
        </Box>
        <Box sx={{ width: "95%", my: "20px", bgcolor: "red" }}>
            <Grid container spacing={0} sx={{ width: '100%'}}>
                <Grid xs={6} md={7} sx={{ height: 500, py: 2, px: 0, mx: 0 }}>
                    <Item sx={{ height: "100%", padding: 0, margin: 0, bgcolor: "pink"}}>
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
                <Grid xs={6} md={5} sx={{ py: 2, px: 0, mx: 0, backgroundColor: 'blue' }}>
                    <Item sx={{ height: '100%', bgcolor: "pink", padding: 0 }}>
                        <iframe
                            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_FIREBASE_API_KEY}&q=place_id:ChIJZcFL1TMFdkgRZcciwfX0gr0`}
                            style={{ width: "100%", height: "100%", border: "0" }}
                            title="map"
                            allowFullScreen
                        />
                    </Item>
                </Grid>
                <Grid xs={6} md={8} sx={{ py: 2, px: 0, mx: 0, backgroundColor: 'orange' }}>
                    <Item sx={{ boxShadow: 0 }}>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            {hotelObj.offers.map((offerObj, index) => (
                                <Item key={index} sx={{ width: '95%', border: 1 }}>
                                    <Box sx={{ textAlign: 'left' }}>
                                        Room Type: {offerObj.room.typeEstimated.category}
                                    </Box>
                                    <Box sx={{ textAlign: 'left' }}>
                                        Beds: {offerObj.room.typeEstimated.bedType} {offerObj.room.typeEstimated.beds}
                                    </Box>
                                    <Box sx={{ textAlign: 'left' }}>
                                        Description: {offerObj.room.description.text}
                                    </Box>
                                    <Box sx={{ textAlign: 'left' }}>
                                        Price: {offerObj.price.total} {offerObj.price.currency}
                                    </Box>
                                </Item>
                            ))}
                        </Stack>
                    </Item>
                </Grid>
                {ratings ? (
                <Grid xs={6} md={4} sx={{ py: 2, px: 0, mx: 0, backgroundColor: 'green' }}>
                    <Item sx={{ boxShadow: 0, border: 1}}>
                        <h3>Overall</h3>
                        [{ratings.numberOfReviews} reviews / {ratings.numberOfRatings} ratings]
                        <LinearProgressWithLabel variant="determinate" value={ratings.overallRating} />
                    </Item>
                    <Item sx={{ boxShadow: 0, border: 1, backgroundColor: "purple"}}>
                        <Grid container justifyContent="center" alignItems="center" spacing={1} sx={{ margin: 0, backgroundColor: "yellow" }}>
                            {Object.entries(ratings.sentiments).map(([key, value], index) => (
                                <Grid item key={key} xs={2} sm={2} md={5} justifyContent="center">
                                    <Item sx={{ boxShadow: 0, border: 1 }}>
                                        <div>
                                            <div>{key}</div>
                                            <div><CircularProgressWithLabel value={value} /></div>
                                        </div>
                                    </Item>
                                </Grid>
                            ))}
                        </Grid>
                    </Item>
                </Grid>
                ) : <div>Loading ratings...</div>}
            </Grid>
        </Box>
      </Stack>
    </Box>
  );
}
