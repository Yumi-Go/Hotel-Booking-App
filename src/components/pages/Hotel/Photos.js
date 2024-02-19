import { useEffect } from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Photos({ hotelObj }) {
  console.log("Received hotelObj in Photos: ", hotelObj);

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
  );
}
