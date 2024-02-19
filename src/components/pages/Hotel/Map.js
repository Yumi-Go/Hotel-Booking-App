import { useEffect } from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Map({ hotelObj }) {
    console.log("Received hotelObj in Map: ", hotelObj);

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
        <Grid xs={6} md={5} sx={{ py: 2, px: 0, mx: 0, backgroundColor: 'blue' }}>
            <Item sx={{ height: '100%', bgcolor: "pink", padding: 0 }}>
                <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_FIREBASE_API_KEY}&q=place_id:${Object.keys(hotelObj.photoUrls)[0]}`}
                    style={{ width: "100%", height: "100%", border: "0" }}
                    title="map"
                    allowFullScreen
                />
            </Item>
        </Grid>
    );
}
