import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


export default function Photos({ hotelObj }) {
    console.log("Received hotelObj in Photos: ", hotelObj);

    return (
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
                        title={hotelObj.name}
                        actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${hotelObj.name}`}
                            >
                                <InfoIcon />
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}
