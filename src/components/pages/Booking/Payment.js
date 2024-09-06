import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CancelSubmitBtn from '../../reusableComponents/CancelSubmitBtn';
import PaymentDetail from "./PaymentDetail";
import Title from "../../reusableComponents/Title";
import { bookingRequest } from "../../../hooks/useHotelAPI";
import useFirestore from "../../../hooks/useFirestore";


export default function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const offerObj = location.state?.offerObj; // from Booking.js
    const guestsObj = location.state?.guestsObj; // from Booking.js
    const nonMemberPwd = location.state?.nonMemberPwd; // from Booking.js
    const [paymentObj, setPaymentObj] = useState({});
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('CurrentUser')) || {});

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('CurrentUser')));
    }, []);

    useEffect(() => {
        console.log("paymentObj is updated: ", paymentObj);
    }, [paymentObj]);

    // const [bookingResult, setBookingResult] = useState(false);
    // const handleBookingResult = () => setBookingResult(true);
    
    console.log("offerObj from Booking.js: ", offerObj);
    console.log("guestsObj from Booking.js: ", guestsObj);
    console.log("nonMemberPwd from Booking.js: ", nonMemberPwd);



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

    // const guestsObj = {
    //     "name": {
    //         "title": "MR",
    //         "firstName": currentUser?.fName,
    //         "lastName": currentUser?.lName
    //     },
    //     "contact": {
    //         "phone": currentUser?.pNum,
    //         "email": currentUser?.email
    //     }
    // }

    
    const cancelHandler = () => {
        // navigate('/');
        navigate(-1);

    }

    const submitHandler = async() => {
        const requestBodyObj = {offerId: offerObj.id, guests: [{...guestsObj}], payments: [{...paymentObj}] };
        try {
            const bookingResponse = await bookingRequest(requestBodyObj);
            //// for testing... example data
            // const bookingResponse = {
            //     "data": [{
            //         "type": "hotel-booking",
            //         "id": "XD_8138319951754",
            //         "providerConfirmationId": "8138319951754",
            //         "associatedRecords": [{
            //             "reference": "QVH2BX",
            //             "originSystemCode": "GDS"
            //         }]
            //     }]
            // }
    
            navigate('/booking_result', { state: { bookingResponse, offerObj, paymentObj, nonMemberPwd } }); // to BookingResult.js
        } catch (err) {
            console.error("Error in submitHandler(Payment.js): ", err);
        }
    }

    return (
        <>
        <Title title={"Payment"} />
        <Box sx={{ height: "300px" }}>
            <PaymentDetail currency={offerObj.price.currency} price={offerObj.price.total} setPaymentObj={setPaymentObj} />
        </Box>
            <CancelSubmitBtn
                cancelHandler={cancelHandler}
                submitHandler={submitHandler}
                cancelText={"cancel"}
                submitText={"pay now"}
            />
        </>
    )
}