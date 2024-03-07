import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckIcon from '@mui/icons-material/Check';
import HotelIcon from '@mui/icons-material/Hotel';
import CloseIcon from '@mui/icons-material/Close';
import PaymentIcon from '@mui/icons-material/Payment';
import BedIcon from '@mui/icons-material/Bed';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Divider from '@mui/material/Divider';
import { capitalize, capitalizeWords, extractSquareMeters, formatDescription } from '../../../hooks/useFormat';



export default function BookingDetail({ offerObj }) {
    
    const getDescriptions = () => {
        if (offerObj.room?.description?.text) {
            return formatDescription(offerObj.room?.description?.text);
        } else {
            return null;
        }
    };

    const descriptions = getDescriptions();
    console.log("descriptions: ", descriptions);

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%'
            }}
        >



                <Box sx={{ width: '70%', borderRadius: 1 }}>
                    <List sx={{ border: '1px' }}>
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={capitalize(offerObj.room?.typeEstimated?.category)}
                                secondary="Room Type"
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    capitalize(offerObj.room?.typeEstimated?.bedType) 
                                    + " " + offerObj.room?.typeEstimated?.beds
                                }
                                secondary="Beds"
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    extractSquareMeters(offerObj.room?.description?.text)[0] 
                                    + " - " + extractSquareMeters(offerObj.room?.description?.text)[1] 
                                    + " \u33A1"
                                }
                                secondary="Area"
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    offerObj.policies?.cancellations[0]?.description?.text ? 
                                    capitalizeWords(offerObj.policies?.cancellations[0]?.description?.text) : "N/A"}
                                secondary="Cancellation"
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    offerObj.policies?.paymentType ? 
                                    offerObj.policies?.paymentType : "N/A"
                                }
                                secondary="Payment"
                            />
                        </ListItem>
                        <Divider />
                        {descriptions && descriptions.map((el, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <CheckIcon />
                                </ListItemIcon>
                                <ListItemText primary={capitalizeWords(el)} />
                            </ListItem>
                        ))}
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={offerObj.price?.total + " (" + offerObj.price?.currency + ")"}
                                secondary="Price"
                            />
                        </ListItem>
                        <Divider />

                    </List>

                </Box>




        </Box>
    )
}