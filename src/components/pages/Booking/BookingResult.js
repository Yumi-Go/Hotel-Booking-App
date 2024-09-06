import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CancelSubmitBtn from '../../reusableComponents/CancelSubmitBtn';
import Title from "../../reusableComponents/Title";
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import useFirestore from "../../../hooks/useFirestore";
import { useHotelContext } from "../../../contexts/HotelContext";



export default function BookingResult() {
    const { addBooking } = useFirestore();
    const { hotelObj } = useHotelContext();

    const navigate = useNavigate();
    const location = useLocation();

    // const bookingResponse = location.state?.bookingResponse; // from Payment.js

    // successful booking 테스트 끝나면 위에 코멘트처리된 라인 언코멘트하고 밑에 테스트용 데이터 코멘트처리하기
    // for testing successful booking (successful booking can't be made in real for test users because it is only allowed to enterprise version users in Amadeus API)
    const bookingResponse = {
        "data": [{
            "type": "hotel-booking",
            "id": "XD_8138319951754",
            "providerConfirmationId": "8138319951754",
            "associatedRecords": [{
                "reference": "QVH2BX",
                "originSystemCode": "GDS"
            }]
        }]
    }
    console.log("bookingResponse from Payment.js in BookingResult.js: ", bookingResponse);
    
    const offerObj = location.state?.offerObj; // from Payment.js
    const paymentObj = location.state?.paymentObj; // from Payment.js
    const nonMemberPwd = location.state?.nonMemberPwd; // from Payment.js
    const hasErrors = Object.keys(bookingResponse)?.[0] === 'errors';
    console.log("hasErrors: ", hasErrors);

    const addSuccessfulBooking = async() => {
        // save only successful Booking to DB
        if (!hasErrors) {            
            await addBooking(bookingResponse.data[0].id, hotelObj, offerObj, paymentObj, nonMemberPwd);
        }
    }

    addSuccessfulBooking();

    const homeHandler = () => {
        // navigate('/');
        navigate("/");

    }

    const redoHandler = () => {
        navigate(-1);
    }

    return (
        <>
        <Title title={"Booking Result"} />
        <Box sx={{ height: "300px" }}>
            <h3>{hasErrors ? "ERROR!" : "Booking Successful!"}</h3>
            {hasErrors ? bookingResponse.errors[0].title : ""}
        </Box>
        <Box>
            {hasErrors ? (
                <CancelSubmitBtn
                    cancelHandler={homeHandler}
                    submitHandler={redoHandler}
                    cancelText={"home"}
                    submitText={"try again"}
                />
            ) : (
                <Button
                    onClick={homeHandler}
                    variant="contained"
                    size="large"
                    startIcon={<HomeIcon />}
                    sx={{ width: '200px' }}
                >
                    Home
                </Button>

            )}
        </Box>
        </>

    )
}