import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';


const Item = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  boxShadow: 0,
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

export default function Ratings({ ratings }) {
  console.log("Received ratings in Ratings: ", ratings);

  // Check if ratings is a string (error message) or an object
  if (typeof ratings === 'string') {
    return (
      <Stack sx={{ boxShadow: 0, border: 0 }}>
        <Item>
          <Box sx={{ color: "indigo" }}>
            <h2>REVIEW</h2>
          </Box>
          <p>No ratings available for this hotel.</p>
        </Item>
      </Stack>
    );
  }

  // Check if ratings has the expected structure
  if (!ratings || !ratings.sentiments || !ratings.overallRating) {
    return (
      <Stack sx={{ boxShadow: 0, border: 0 }}>
        <Item>
          <Box sx={{ color: "indigo" }}>
            <h2>REVIEW</h2>
          </Box>
          <p>Ratings data is not available in the expected format.</p>
        </Item>
      </Stack>
    );
  }

  return (
    <Stack sx={{ boxShadow: 0, border: 0 }}>
      <Item>
        <Box sx={{ color: "indigo" }}>
          <h2>REVIEW</h2>
        </Box>
        <h4>Overall</h4>
        [{ratings.numberOfReviews} reviews / {ratings.numberOfRatings} ratings]
        <LinearProgressWithLabel variant="determinate" value={ratings.overallRating} />
      </Item>
      <Item>
        <Grid container justifyContent="center" alignItems="center" spacing={1} sx={{ margin: 0 }}>
        {Object.entries(ratings.sentiments).map(([key, value], index) => (
          <Grid item key={key} xs={2} sm={2} md={5} justifyContent="center">
            <Item sx={{ boxShadow: 0, border: 1 }}>
              <div>
                <div><p>{key}</p></div>
                <div><CircularProgressWithLabel value={value} /></div>
              </div>
            </Item>
          </Grid>
        ))}
        </Grid>
      </Item>
    </Stack>
  );
}
