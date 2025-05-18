import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import useAuth from '../../../hooks/useAuth';


export default function PaymentDetail({ currency, price, setPaymentObj }) { // offerObj from Payment.js

    // const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('CurrentUser')) || {});
    const { currentUser } = useAuth();
    

    // useEffect(() => {
    //     setCurrentUser(JSON.parse(localStorage.getItem('CurrentUser')));
    // }, []);

    const [method, setMethod] = useState('');
    const [vendorCode, setVendorCode] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    useEffect(() => {
        setPaymentObj({
            "method": "creditCard",
            "card": {
                "vendorCode": vendorCode,
                "cardNumber": cardNumber,
                "expiryDate": expiryDate
            }
        });
    }, [method, vendorCode, cardNumber, expiryDate, setPaymentObj]);



    // const payments = {
    //     "method": "creditCard",
    //     "card": {
    //         "vendorCode": "VI",
    //         "cardNumber": "0000000000000000",
    //         "expiryDate": "2026-01"
    //     }
    // }


    
    const payMethod = [
        { value: 'creditCard', label: 'Credit Card' },
    ];

    const vendorCodeList = [
        { value: 'CA', label: 'MasterCard' },
        { value: 'VI', label: 'Visa' },
        { value: 'AX', label: 'American Express' },
        { value: 'DC', label: 'Diners Club' },
        { value: 'AU', label: 'Carte Aurore' },
        { value: 'CG', label: 'Cofinoga' },
        { value: 'DS', label: 'Discover' },
        { value: 'GK', label: 'Lufthansa GK Card' },
        { value: 'JC', label: 'Japanese Credit Bureau' },
        { value: 'TC', label: 'Torch Club' },
        { value: 'TP', label: 'Universal Air Travel Card' },
        { value: 'BC', label: 'Bank Card' },
        { value: 'DL', label: 'Delta' },
        { value: 'MA', label: 'Maestro' },
        { value: 'UP', label: 'China UnionPay' },
        { value: 'VE', label: 'Visa Electron' },
    ];

    // if (!currentUser) {
    //     return <div><NoAccountsIcon sx={{ fontSize: 100, color: "grey" }}/></div>
    // }
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '60ch' } }}
            noValidate
            autoComplete="off"
        >
            <h2>{currency} {price}</h2>
            <div>
                <TextField
                    id="select-payMethod"
                    select
                    defaultValue="creditCard"
                    variant="standard"
                    onChange={(e) => setMethod(e.target.value)}
                    // disabled
                >
                    {payMethod.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div>
                <TextField
                    required
                    id="select-vendorcode"
                    select
                    label="Vendor Code"
                    variant="standard"
                    value={vendorCode}
                    onChange={(e) => setVendorCode(e.target.value)}
                >
                    {vendorCodeList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div>
                <TextField
                    required
                    id="cardnumber-textfield"
                    label="Card Number"
                    placeholder="Enter Card Number"
                    variant="standard"
                    onChange={(e) => setCardNumber(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    required
                    id="expirydate-textfield"
                    label="Expiry Date"
                    placeholder="Enter Expiry Date"
                    variant="standard"
                    onChange={(e) => setExpiryDate(e.target.value)}
                />
            </div>
        </Box>
    )
}

