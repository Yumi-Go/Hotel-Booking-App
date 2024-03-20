import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import CancelSubmitBtn from '../../reusableComponents/CancelSubmitBtn';
import PaymentDetail from "./PaymentDetail";
import { bookingRequest } from "../../../hooks/useHotelAPI";



export default function Payment() {

    const navigate = useNavigate();
    const location = useLocation();
    const offerObj = location.state?.offerObj; // from Booking.js
    const [paymentObj, setPaymentObj] = useState({});
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('CurrentUser')) || {});

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('CurrentUser')));
    }, []);


    useEffect(() => {
        console.log("paymentObj is changed: ", paymentObj);
    }, [paymentObj]);


    // const [bookingResult, setBookingResult] = useState(false);
    // const handleBookingResult = () => setBookingResult(true);
    
    console.log("offerObj from Booking.js: ", offerObj);


    // Test data (Requesting payment with real credit card is allowed in Production version. So I should use this test data in Test version)
    // const testRequestBody = {
    //     "data": {
    //         "offerId": offerObj.id,
    //         "guests": [
    //             {
    //                 "name": {
    //                     "title": "MR",
    //                     "firstName": "BOB",
    //                     "lastName": "SMITH"
    //                 },
    //                 "contact": {
    //                     "phone": "+33679278416",
    //                     "email": "bob.smith@email.com"
    //                 }
    //             }
    //         ],
    //         "payments": [
    //             {
    //                 "method": "creditCard",
    //                 "card": {
    //                     "vendorCode": "VI",
    //                     "cardNumber": "0000000000000000",
    //                     "expiryDate": "2026-01"
    //                 }
    //             }
    //         ]
    //     }
    // }


    const guestsObj = {
        "name": {
            "title": "MR",
            "firstName": currentUser.fName,
            "lastName": currentUser.lName
        },
        "contact": {
            "phone": currentUser.pNum,
            "email": currentUser.email
        }
    }


    // console.log("{ offerId: offerObj.id, guests: {...guestsObj}, payments: {...paymentObj} }");
    // console.log({ offerId: offerObj.id, guests: {...guestsObj}, payments: {...paymentObj} });
    
    const cancelHandler = () => {
        // navigate('/');
        navigate(-1);

    }

    const submitHandler = async() => {
        const requestBodyObj = {offerId: offerObj.id, guests: [{...guestsObj}], payments: [{...paymentObj}] };
        await bookingRequest(requestBodyObj);
        // navigate('/booking_result', { state: { offerObj } });
    }

    return (
        <div>
            <h1>Payment</h1>
            <PaymentDetail setPaymentObj={setPaymentObj} />
            <CancelSubmitBtn
                cancelHandler={cancelHandler}
                submitHandler={submitHandler}
                cancelText={"cancel"}
                submitText={"pay now"}
            />
        </div>
    )
}