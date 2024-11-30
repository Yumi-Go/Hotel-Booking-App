import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import OfferDetail from "./OfferDetail";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '95%',
    border: '1px solid',
    cursor: 'pointer',
}));


export default function Availability({ offersObj }) {
    console.log("offersObj in Availability (from HotelDetail.js): ", offersObj);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [open, setOpen] = useState(false);
    
    const handleOpen = (offer) => {
        setSelectedOffer(offer);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedOffer(null);
    };

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            {offersObj.map((offer, index) => (
                <React.Fragment key={index}>
                    <Item key={index} onClick={() => handleOpen(offer)}>
                        <Box sx={{ textAlign: 'left' }}>
                            Room Type: {offer.room.typeEstimated.category}
                        </Box>
                        <Box sx={{ textAlign: 'left' }}>
                            Beds: {offer.room.typeEstimated.bedType} {offer.room.typeEstimated.beds}
                        </Box>
                        {/* <Box sx={{ textAlign: 'left' }}>
                            Description: {offerObj.room.description.text}
                        </Box> */}
                        <Box sx={{ textAlign: 'left' }}>
                            Price: {offer.price.total} {offer.price.currency}
                        </Box>
                    </Item>

                </React.Fragment>
            ))}

            {selectedOffer && (
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <OfferDetail offerObj={selectedOffer} handleClose={handleClose} />
                </Modal>
            )}
        </Stack>
    );
}





















