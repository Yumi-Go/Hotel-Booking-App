import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';
import CancelSubmitBtn from '../../reusableComponents/CancelSubmitBtn';
import CheckIcon from '@mui/icons-material/Check';
import HotelIcon from '@mui/icons-material/Hotel';
import CloseIcon from '@mui/icons-material/Close';
import PaymentIcon from '@mui/icons-material/Payment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BedIcon from '@mui/icons-material/Bed';
import { capitalize, capitalizeWords, extractSquareMeters, formatDescription } from '../../../hooks/useFormat';


// offerObj, handleClose from Availability.js
export default function OfferDetail ({ offerObj, handleClose }) {

    console.log("offerObj in OfferDetail.js (from Availability.js): ", offerObj);

    const navigate = useNavigate();

    const cancelHandler = () => {
        // navigate('/');
        handleClose();
    }

    const submitHandler = () => {
        navigate('/booking', { state: { offerObj } });
    }

    console.log(formatDescription("Prepay Non-refundable Non-changeable, prepay in full\nSuperior King Room, 1 King,\n23sqm/247sqft-35sqm/377sqft, Wireless"));

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 0,
    };


    return (
        <Box sx={style} tabIndex={-1}>
            <AppBar sx={{ position: 'relative' }} style={{ padding: 0 }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Room Details
                    </Typography>
                    <StarBorderIcon sx={{ padding: 0, margin: 0 }}/>
                </Toolbar>
            </AppBar>
            <List sx={{ bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <HotelIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={capitalize(offerObj.room?.typeEstimated?.category)}
                        secondary="Room Type"
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <BedIcon />
                        </Avatar>
                    </ListItemAvatar>
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
                    <ListItemAvatar>
                        <Avatar>
                            <PaymentIcon />
                        </Avatar>
                    </ListItemAvatar>
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
                    <ListItemAvatar>
                        <Avatar>
                            <CloseIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={capitalizeWords(offerObj.policies?.cancellations[0]?.description?.text) + " | " + offerObj.policies?.cancellations[0]?.deadline}
                        secondary="Cancellation Deadline"
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PaymentIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={offerObj.policies?.paymentType}
                        secondary="Payment Type"
                    />
                </ListItem>
                <Divider />
                {formatDescription(offerObj.room?.description?.text).map((el, index) => (
                    <ListItem key={index}>
                        <ListItemIcon>
                            <CheckIcon />
                        </ListItemIcon>
                        <ListItemText primary={capitalizeWords(el)} />
                    </ListItem>
                ))}
                <Divider />
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AttachMoneyIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={offerObj.price?.total + " (" + offerObj.price?.currency + ")"}
                        secondary="Price"
                    />
                </ListItem>
                <Divider />

            </List>
            {/* <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{ pb: 4, pt: 1 }}
            >
                <Button
                    variant="outlined"
                    onClick={handleClose}
                    size="large"
                    startIcon={<CloseIcon />}
                    sx={{ width: '200px' }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    endIcon={<DoubleArrowIcon />}
                    sx={{ width: '200px' }}
                >
                    Reserve
                </Button>
            </Stack> */}

            <CancelSubmitBtn
                cancelHandler={cancelHandler}
                submitHandler={submitHandler}
                cancelText={"cancel"}
                submitText={"next"}
            />            
        </Box>
    );
}




// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import CheckIcon from '@mui/icons-material/Check';
// import HotelIcon from '@mui/icons-material/Hotel';
// import CloseIcon from '@mui/icons-material/Close';
// import PaymentIcon from '@mui/icons-material/Payment';
// import BedIcon from '@mui/icons-material/Bed';
// import Divider from '@mui/material/Divider';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
// import StarBorderIcon from '@mui/icons-material/StarBorder';
// import { capitalize, capitalizeWords, extractSquareMeters, formatDescription } from '../../../hooks/useFormat';
// import CancelSubmitBtn from '../../reusableComponents/CancelSubmitBtn';
// import { useNavigate } from 'react-router-dom';



// export default function OfferDetail({ offerObj, handleClose }) {

//     const style = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 800,
//         bgcolor: 'background.paper',
//         boxShadow: 24,
//         p: 0,
//     };

//     const navigate = useNavigate();


//     const cancelHandler = () => {
//         // navigate('/');
//         handleClose();

//     }

//     const submitHandler = () => {
//         navigate('/booking', { state: { offerObj } });

//     }

//     console.log(formatDescription("Prepay Non-refundable Non-changeable, prepay in full\nSuperior King Room, 1 King,\n23sqm/247sqft-35sqm/377sqft, Wireless"));


//     return (

//         <Box sx={style}>
//             <AppBar sx={{ position: 'relative' }} style={{ padding: 0 }}>
//                 <Toolbar>
//                     <IconButton
//                         edge="start"
//                         color="inherit"
//                         onClick={handleClose}
//                         aria-label="close"
//                     >
//                         <CloseIcon />
//                     </IconButton>
//                     <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
//                         Room Details
//                     </Typography>
//                     <StarBorderIcon sx={{ padding: 0, margin: 0 }}/>
//                 </Toolbar>
//             </AppBar>
//             <List sx={{ bgcolor: 'background.paper' }}>
//                 <ListItem>
//                     <ListItemAvatar>
//                         <Avatar>
//                             <HotelIcon />
//                         </Avatar>
//                     </ListItemAvatar>
//                     <ListItemText
//                         primary={capitalize(offerObj.room.typeEstimated.category)}
//                         secondary="Room Type"
//                     />
//                 </ListItem>
//                 <Divider />
//                 <ListItem>
//                     <ListItemAvatar>
//                         <Avatar>
//                             <BedIcon />
//                         </Avatar>
//                     </ListItemAvatar>
//                     <ListItemText
//                         primary={
//                             capitalize(offerObj.room.typeEstimated.bedType) 
//                             + " " + offerObj.room.typeEstimated.beds
//                         }
//                         secondary="Beds"
//                     />
//                 </ListItem>
//                 <Divider />
//                 <ListItem>
//                     <ListItemAvatar>
//                         <Avatar>
//                             <PaymentIcon />
//                         </Avatar>
//                     </ListItemAvatar>
//                     <ListItemText
//                         primary={
//                             extractSquareMeters(offerObj.room.description.text)[0] 
//                             + " - " + extractSquareMeters(offerObj.room.description.text)[1] 
//                             + " \u33A1"
//                         }
//                         secondary="Area"
//                     />
//                 </ListItem>
//                 <Divider />
//                 <ListItem>
//                     <ListItemAvatar>
//                         <Avatar>
//                             <CloseIcon />
//                         </Avatar>
//                     </ListItemAvatar>
//                     <ListItemText
//                         primary={capitalizeWords(offerObj.policies.cancellations[0].description.text)}
//                         secondary="Cancellation"
//                     />
//                 </ListItem>
//                 <Divider />
//                 <ListItem>
//                     <ListItemAvatar>
//                         <Avatar>
//                             <PaymentIcon />
//                         </Avatar>
//                     </ListItemAvatar>
//                     <ListItemText
//                         primary={offerObj.policies.paymentType}
//                         secondary="Payment"
//                     />
//                 </ListItem>
//                 <Divider />
//                 {formatDescription(offerObj.room.description.text).map((el, index) => (
//                     <ListItem key={index}>
//                         <ListItemIcon>
//                             <CheckIcon />
//                         </ListItemIcon>
//                         <ListItemText primary={capitalizeWords(el)} />
//                     </ListItem>
//                 ))}
//                 <Divider />
//             </List>
//             {/* <Stack
//                 direction="row"
//                 spacing={2}
//                 justifyContent="center"
//                 alignItems="center"
//                 sx={{ pb: 4, pt: 1 }}
//             >
//                 <Button
//                     variant="outlined"
//                     onClick={handleClose}
//                     size="large"
//                     startIcon={<CloseIcon />}
//                     sx={{ width: '200px' }}
//                 >
//                     Cancel
//                 </Button>
//                 <Button
//                     variant="contained"
//                     size="large"
//                     endIcon={<DoubleArrowIcon />}
//                     sx={{ width: '200px' }}
//                 >
//                     Reserve
//                 </Button>
//             </Stack> */}

//             <CancelSubmitBtn
//                 cancelHandler={cancelHandler}
//                 submitHandler={submitHandler}
//                 cancelText={"cancel"}
//                 submitText={"next"}
//             />            
//         </Box>
//     );
// }


