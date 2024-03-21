import React, { useState, useEffect, forwardRef } from "react";
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import OfferDetail from "./OfferDetail";
import { useRef } from 'react';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Availability({ offersObj }) {
    const ref = useRef(null);

    console.log("Received offersObj in Availability: ", offersObj);
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
                    <Item key={index} onClick={() => handleOpen(offer)} sx={{ width: '95%', border: 1 }}>
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

                    <Modal
                        key={selectedOffer?.id || 'modal'}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <OfferDetail offerObj={selectedOffer} handleClose={handleClose} ref={ref} />
                    </Modal>
                </React.Fragment>
            ))}
        </Stack>
    );
}





















