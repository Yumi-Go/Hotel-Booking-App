import React, { useState, useEffect } from "react";
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
}));


export default function Availability({ hotelObj }) {
    console.log("Received hotelObj in Availability: ", hotelObj);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            {hotelObj.offers.map((offerObj, index) => (
                <React.Fragment key={index}>
                    <Item key={index} onClick={handleOpen} sx={{ width: '95%', border: 1 }}>
                        <Box sx={{ textAlign: 'left' }}>
                            Room Type: {offerObj.room.typeEstimated.category}
                        </Box>
                        <Box sx={{ textAlign: 'left' }}>
                            Beds: {offerObj.room.typeEstimated.bedType} {offerObj.room.typeEstimated.beds}
                        </Box>
                        {/* <Box sx={{ textAlign: 'left' }}>
                            Description: {offerObj.room.description.text}
                        </Box> */}
                        <Box sx={{ textAlign: 'left' }}>
                            Price: {offerObj.price.total} {offerObj.price.currency}
                        </Box>
                    </Item>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <OfferDetail offerObj={offerObj} handleClose={handleClose} />
                    </Modal>
                </React.Fragment>
            ))}
        </Stack>
    );
}





















