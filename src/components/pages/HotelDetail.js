import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';


// search result (single item for each hotel from multiple hotels)
export default function HotelDetail({ hotelObj }) {


  console.log("Received hotelObj: ", hotelObj);

  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

  return (
    <Box sx={{ width: "100%", display:"flex", position: "absolute", justifyContent: 'center'}}>
      <Stack sx={{ alignItems: 'center', bgcolor: '#dedede', margin: 0, padding: 0 }}>
        <Box>


        </Box>
        <Box sx={{ width: "95%", my: "20px", bgcolor: "red" }}>
        <Grid container spacing={2}>
  <Grid xs={6} md={8}>
    <Item>xs=6 md=8</Item>
  </Grid>
  <Grid xs={6} md={4}>
    <Item>xs=6 md=4</Item>
  </Grid>
  <Grid xs={6} md={4}>
    <Item>xs=6 md=4</Item>
  </Grid>
  <Grid xs={6} md={8}>
    <Item>xs=6 md=8</Item>
  </Grid>
</Grid>
        </Box>
      </Stack>
    </Box>
  );
}
