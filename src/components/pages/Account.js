import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import useFirestore from '../../hooks/useFirestore';
import useAuth from '../../hooks/useAuth';
import CancelSubmitBtn from '../reusableComponents/CancelSubmitBtn';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import LogIn from '../reusableComponents/LogIn';




export default function Account() {
    const navigate = useNavigate();
    const { logOut } = useAuth();
    const { updateUserInfo } = useFirestore();

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('CurrentUser')) || null);
    // const currentUser = JSON.parse(localStorage.getItem('CurrentUser')) || null;

    const [fName, setFName] = useState('');
    const [mName, setMName] = useState('');
    const [lName, setLName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState("Ireland");    
    





    // // useEffect(() => {
    //     if (!currentUser) {
    //         navigate('/login');
    //     }
    // // }, [currentUser, navigate]);

    const logoutHandler = async () => {
        await logOut();
        navigate('/');
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            console.log("No user is currently logged in.");
            return;
        }
        
        console.log(fName, mName, lName, phoneNumber, country);
        await updateUserInfo(fName, mName, lName, phoneNumber, country);
    };

    const cancelHandler = () => {
        navigate('/');
    }
    
    // change later..
    const countries = [
        { value: 'Ireland', label: 'IR' },
        { value: 'USA', label: 'US' },
        { value: 'Korea', label: 'KO' },
        { value: 'France', label: 'FR' },
    ];

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
            noValidate
            autoComplete="off"
            onSubmit={submitHandler}
        >
            <div><h1>Account</h1></div>
            <div>
                <TextField
                    required
                    id="outlined-textarea"
                    label="First Name"
                    placeholder="Enter Your First Name"
                    variant="standard"
                    value={fName}
                />
                <TextField
                    id="outlined-textarea"
                    label="Middle Name"
                    placeholder="(Optional) Enter Your Middle Name"
                    variant="standard"
                    value={mName}
                />
                <TextField
                    required
                    id="outlined-textarea"
                    label="Last Name"
                    placeholder="Enter Your Last Name"
                    variant="standard"
                    value={lName}
                />
            </div>

            <div>
                <TextField
                    required
                    id="outlined-textarea"
                    label="Email"
                    placeholder="Enter Your Last Name"
                    variant="standard"
                    value={currentUser?.email}
                    disabled
                />
                <TextField
                    id="filled-textarea"
                    label="Phone Number"
                    placeholder="Enter Your Phone Number"
                    variant="standard"
                    value={phoneNumber}
                />
                <TextField
                    id="standard-select-countries"
                    select
                    label="Contries"
                    defaultValue="Ireland"
                    variant="standard"
                    value={country}
                >
                    {countries.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <CancelSubmitBtn cancelHandler={cancelHandler} submitHandler={submitHandler}/>
            <Button
                variant="text"
                onClick={logoutHandler}
                startIcon={<LogoutIcon />}
            >
                Log Out
            </Button>
        </Box>
    )


}




