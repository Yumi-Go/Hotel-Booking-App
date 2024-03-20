import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import CancelSubmitBtn from '../../reusableComponents/CancelSubmitBtn';
import PaymentDetail from "./PaymentDetail";




export default function BookingResult() {

    const navigate = useNavigate();
    const location = useLocation();
    const offerObj = location.state?.offerObj; // from Booking.js

    // const [bookingResult, setBookingResult] = useState(false);
    // const handleBookingResult = () => setBookingResult(true);
    
    console.log("offerObj from Booking.js: ", offerObj);


    const cancelHandler = () => {
        // navigate('/');
        navigate(-1);

    }

    const submitHandler = () => {

        navigate('/');

    }

    return (
        <div>
            <h1>Booking Result</h1>

            <PaymentDetail offerObj={offerObj} />
            <CancelSubmitBtn
                cancelHandler={cancelHandler}
                submitHandler={submitHandler}
                cancelText={"home"}
                submitText={"home"}
            />
        </div>
    )
}