import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckIcon from '@mui/icons-material/Check';
import HotelIcon from '@mui/icons-material/Hotel';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import PaymentIcon from '@mui/icons-material/Payment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BedIcon from '@mui/icons-material/Bed';

import { capitalize, capitalizeWords, extractSquareMeters, formatDescription } from '../../../hooks/useFormat';


export default function OfferDetail({ offerObj }) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

console.log(formatDescription("Prepay Non-refundable Non-changeable, prepay in full\nSuperior King Room, 1 King,\n23sqm/247sqft-35sqm/377sqft, Wireless"));


    return (
    <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            ROOM DETAIL
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Any description...........
        </Typography>
        <h1>{offerObj.price.total} {offerObj.price.currency}</h1>
        
        <List sx={{ bgcolor: 'background.paper' }}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <HotelIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={capitalize(offerObj.room.typeEstimated.category)} secondary="Room Type" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <BedIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={capitalize(offerObj.room.typeEstimated.bedType) + " " + offerObj.room.typeEstimated.beds} secondary="Beds" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <CloseIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={capitalizeWords(offerObj.policies.cancellations[0].description.text)} secondary="Cancellation" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <PaymentIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={offerObj.policies.paymentType} secondary="Payment" />
            </ListItem>
            {formatDescription(offerObj.room.description.text).map(el => (
                <ListItem>
                    <ListItemIcon>
                        <CheckIcon />
                    </ListItemIcon>
                    <ListItemText primary={capitalizeWords(el)} />
                </ListItem>
            ))}
        </List>
    </Box>
    );
    
}