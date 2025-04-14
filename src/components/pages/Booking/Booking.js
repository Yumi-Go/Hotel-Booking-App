import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import BookingDetail from './BookingDetail';
import Title from "../../reusableComponents/Title";
import CancelSubmitBtn from '../../reusableComponents/CancelSubmitBtn';
import BookingUserInfo from './BookingUserInfo';
import BookingNonMemberUserInfo from "./BookingNonMemberUserInfo";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { Box } from "@mui/material";
import { useHotelContext } from "../../../contexts/HotelContext";


export default function Booking() {

    const navigate = useNavigate();
    const location = useLocation();
    const offerObj = location.state?.offerObj; // from OfferDetail.js
    const { hotelObj } = useHotelContext();

        // // booking부터 payment까지 테스트 이걸로 하기 (테스트 끝나면 이거 지우고 위에 코멘트처리한거 해제)
        // const offerObj = {
        //     "id": "5CD6N4B5OW",
        //     "checkInDate": "2024-10-01",
        //     "checkOutDate": "2024-10-02",
        //     "rateCode": "RAC",
        //     "rateFamilyEstimated": {
        //         "code": "BAR",
        //         "type": "P"
        //     },
        //     "commission": {
        //         "percentage": "10.0"
        //     },
        //     "boardType": "BREAKFAST",
        //     "room": {
        //         "type": "T1D",
        //         "typeEstimated": {
        //             "category": "STANDARD_ROOM",
        //             "beds": 1,
        //             "bedType": "KING"
        //         },
        //         "description": {
        //             "text": "BEST AVAILABLE RATES BREAKFAST INCLUDED \n45*53sq -queen-king size bed -free wifi -AC marble bathroom-\ncomplimentary soft drinks ",
        //             "lang": "EN"
        //         }
        //     },
        //     "guests": {
        //         "adults": 2
        //     },
        //     "price": {
        //         "currency": "EUR",
        //         "total": "750.00",
        //         "variations": {
        //             "average": {
        //                 "total": "750.00"
        //             },
        //             "changes": [
        //                 {
        //                     "startDate": "2024-10-01",
        //                     "endDate": "2024-10-02",
        //                     "total": "750.00"
        //                 }
        //             ]
        //         }
        //     },
        //     "policies": {
        //         "cancellations": [
        //             {
        //                 "numberOfNights": 1,
        //                 "deadline": "2024-09-30T14:00:00+02:00"
        //             }
        //         ],
        //         "guarantee": {
        //             "acceptedPayments": {
        //                 "creditCards": [
        //                     "AX",
        //                     "DC",
        //                     "JC",
        //                     "CA",
        //                     "VI"
        //                 ],
        //                 "methods": [
        //                     "CREDIT_CARD"
        //                 ],
        //                 "creditCardPolicies": [
        //                     {
        //                         "vendorCode": "AX"
        //                     },
        //                     {
        //                         "vendorCode": "DC"
        //                     },
        //                     {
        //                         "vendorCode": "JC"
        //                     },
        //                     {
        //                         "vendorCode": "CA"
        //                     },
        //                     {
        //                         "vendorCode": "VI"
        //                     }
        //                 ]
        //             }
        //         },
        //         "paymentType": "guarantee"
        //     },
        //     "self": "https://test.api.amadeus.com/v3/shopping/hotel-offers/5CD6N4B5OW"
        // }
        console.log("offerObj in Booking.js (OfferDetail.js): ", offerObj);
        console.log("hotelObj in Booking.js (from context): ", hotelObj);

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('CurrentUser')) || null);
    const [nonMemberObj, setNonMemberObj] = useState({});
    // const [fName, setFName] = useState('');
    // const [mName, setMName] = useState('');
    // const [lName, setLName] = useState('');
    // const [email, setEmail] = useState('');
    // const [pNum, setPNum] = useState('');
    // const [address, setAddress] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [nonMemberValidation, setNonMemberValidation] = useState(false);

    useEffect(() => {
        console.log("nonMemberObj is updated: ", nonMemberObj);
    }, [nonMemberObj]);

    const cancelHandler = () => {
        // navigate('/');
        navigate(-1);
    }

    const submitHandler = () => {
        if (!nonMemberValidation) {
            const errMsg = Object.values(errors).join('\n');
            alert(errMsg);
        } else {
            const nonMemberPwd = currentUser ? null : nonMemberObj.password;
            const guestsObj = {
                "name": {
                    "title": "MR",
                    "firstName": currentUser ? currentUser.fName : nonMemberObj.fName,
                    "lastName": currentUser ? currentUser.lName : nonMemberObj.lName,
                },
                "contact": {
                    "phone": currentUser ? currentUser.pNum : nonMemberObj.pNum,
                    "email": currentUser ? currentUser.email : nonMemberObj.email,
                }
            };
            navigate('/payment', { state: { offerObj, guestsObj, nonMemberPwd } }); // to Payment.js
        }
    }

    const userInfoEditHandler = () => {
        navigate('/account');
    }

    return (
        <div>
            <Title title={"Booking"} />
            
            {/* {currentUser ? (
            <Divider sx={{ px: 50 }}>
                <h3>
                    "Your Information" : "Non-member User Information"
                </h3>
            </Divider>
            ) : ""} */}

            {currentUser ? (
                <Box>
                    <AccountCircleIcon sx={{ fontSize: 50, color: "grey" }}/>
                    <p>Your Information</p>
                </Box>
            ) : (
                <Box>
                    <NoAccountsIcon sx={{ fontSize: 50, color: "grey" }}/>
                    <p>Non-member User Information</p>
                </Box>
            )}

            <Box>
            {currentUser ? (
                <BookingUserInfo userInfoEditHandler={userInfoEditHandler} />
            ) : (
                <BookingNonMemberUserInfo
                setNonMemberValidation={setNonMemberValidation}
                errors={errors}
                setErrors={setErrors}
                setNonMemberObj={setNonMemberObj} />
            )}
            </Box>
            {/* <Button
                onClick={userInfoEditHandler}
                variant="text"
                color='secondary'
                size="large"
                endIcon={<EditIcon />}
                sx={{ width: '200px' }}
            >
                Edit
            </Button> */}
            <Divider sx={{ pt: 10, pb: 5, px: 50 }}>
                <h3>Booking Detail</h3>
                {/* <Button
                    onClick={userInfoEditHandler}
                    variant="contained"
                    color='secondary'
                    size="large"
                    startIcon={<FormatListBulletedIcon />}
                    sx={{ width: '200px' }}
                >
                Booking Detail
                </Button> */}
                {/* <Chip label="Booking Detail" size="medium" color="secondary" variant="outlined"/> */}
            </Divider>
            <BookingDetail offerObj={offerObj} />
            <CancelSubmitBtn
                cancelHandler={cancelHandler}
                submitHandler={submitHandler}
                cancelText={"cancel"}
                submitText={"next"}
            />
        </div>
    )
}