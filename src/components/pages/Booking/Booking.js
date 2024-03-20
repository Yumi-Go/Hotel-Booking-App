import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import BookingDetail from './BookingDetail';
import Button from '@mui/material/Button';
import CancelSubmitBtn from '../../reusableComponents/CancelSubmitBtn';
import BookingUserInfo from './BookingUserInfo';





export default function Booking() {

    const navigate = useNavigate();
    const location = useLocation();
    // const offerObj = location.state?.offerObj; // from OfferDetail.js


        // booking부터 payment까지 테스트 이걸로 하기 (테스트 끝나면 이거 지우고 위에 코멘트처리한거 해제)
        const offerObj = {
            "id": "5CD6N4B5OW",
            "checkInDate": "2024-10-01",
            "checkOutDate": "2024-10-02",
            "rateCode": "RAC",
            "rateFamilyEstimated": {
                "code": "BAR",
                "type": "P"
            },
            "commission": {
                "percentage": "10.0"
            },
            "boardType": "BREAKFAST",
            "room": {
                "type": "T1D",
                "typeEstimated": {
                    "category": "STANDARD_ROOM",
                    "beds": 1,
                    "bedType": "KING"
                },
                "description": {
                    "text": "BEST AVAILABLE RATES BREAKFAST INCLUDED \n45*53sq -queen-king size bed -free wifi -AC marble bathroom-\ncomplimentary soft drinks ",
                    "lang": "EN"
                }
            },
            "guests": {
                "adults": 2
            },
            "price": {
                "currency": "EUR",
                "total": "750.00",
                "variations": {
                    "average": {
                        "total": "750.00"
                    },
                    "changes": [
                        {
                            "startDate": "2024-10-01",
                            "endDate": "2024-10-02",
                            "total": "750.00"
                        }
                    ]
                }
            },
            "policies": {
                "cancellations": [
                    {
                        "numberOfNights": 1,
                        "deadline": "2024-09-30T14:00:00+02:00"
                    }
                ],
                "guarantee": {
                    "acceptedPayments": {
                        "creditCards": [
                            "AX",
                            "DC",
                            "JC",
                            "CA",
                            "VI"
                        ],
                        "methods": [
                            "CREDIT_CARD"
                        ],
                        "creditCardPolicies": [
                            {
                                "vendorCode": "AX"
                            },
                            {
                                "vendorCode": "DC"
                            },
                            {
                                "vendorCode": "JC"
                            },
                            {
                                "vendorCode": "CA"
                            },
                            {
                                "vendorCode": "VI"
                            }
                        ]
                    }
                },
                "paymentType": "guarantee"
            },
            "self": "https://test.api.amadeus.com/v3/shopping/hotel-offers/5CD6N4B5OW"
        }



    const [payment, setPayment] = useState(false);
    const proceedPayment = () => setPayment(true);

    
    console.log("offerObj from OfferDetail.js: ", offerObj);


    const cancelHandler = () => {
        // navigate('/');
        navigate(-1);

    }

    const submitHandler = () => {

        navigate('/payment', { state: { offerObj } });
        // proceedPayment();

    }

    const userInfoEditHandler = () => {
        navigate('/account');
    }

    return (
        <div>
            <h1>Booking</h1>
            <BookingUserInfo userInfoEditHandler={userInfoEditHandler} />
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
            <Divider sx={{p: 10, pt: 10, pb: 5 }}>
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