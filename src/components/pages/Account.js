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
import { capitalize } from '../../hooks/useFormat';
import Title from '../reusableComponents/Title';
import { formatPhoneNumber } from '../../hooks/useFormat';

export default function Account() {
    const navigate = useNavigate();
    const { logOut, currentUser } = useAuth();
    const { updateUserInfo } = useFirestore();

    // Add error states
    const [errors, setErrors] = useState({});
    
    const [fName, setFName] = useState(currentUser?.fName || '');
    const [mName, setMName] = useState(currentUser?.mName || '');
    const [lName, setLName] = useState(currentUser?.lName || '');
    const [pNum, setPNum] = useState(currentUser?.pNum || '');
    const [address, setAddress] = useState(currentUser?.address || '');

    // Update form fields when currentUser changes
    useEffect(() => {
        if (currentUser) {
            setFName(currentUser.fName || '');
            setMName(currentUser.mName || '');
            setLName(currentUser.lName || '');
            setPNum(currentUser.pNum || '');
            setAddress(currentUser.address || '');
        }
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    const validateForm = () => {
        const newErrors = {};
        
        // First Name validation
        if (!fName.trim()) {
            newErrors.fName = 'First name is required';
        } else if (!/^[a-zA-Z\s-']{2,50}$/.test(fName.trim())) {
            newErrors.fName = 'First name should be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes';
        }

        // Middle Name validation (optional)
        if (mName && !/^[a-zA-Z\s-']{2,50}$/.test(mName.trim())) {
            newErrors.mName = 'Middle name should be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes';
        }

        // Last Name validation
        if (!lName.trim()) {
            newErrors.lName = 'Last name is required';
        } else if (!/^[a-zA-Z\s-']{2,50}$/.test(lName.trim())) {
            newErrors.lName = 'Last name should be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes';
        }

        // Phone Number validation
        if (pNum && !/^\+?[1-9]\d{1,14}$/.test(pNum.replace(/\s+/g, ''))) {
            newErrors.pNum = 'Please enter a valid phone number with country code (e.g., +353123456789)';
        }

        // Address validation
        if (address && address.length > 200) {
            newErrors.address = 'Address should not exceed 200 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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

        if (!validateForm()) {
            return;
        }
        
        console.log(fName, mName, lName, address, pNum);
        await updateUserInfo(fName, mName, lName, address, pNum);
        // window.location.reload();
        navigate('/account');
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

    //// if above useEffect is not working, use this..
    // if (!currentUser) {
    //     return <Navigate to="/login" replace />;
    // }
    return (
        <>
        <Title title={"Account"} />
        
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
            noValidate
            autoComplete="off"
            onSubmit={submitHandler}
        >
            <div>
                <TextField
                    required
                    id="outlined-textarea"
                    label="First Name"
                    placeholder="Enter Your First Name"
                    variant="standard"
                    value={capitalize(fName)}
                    onChange={(e) => setFName(e.target.value)}
                    error={!!errors.fName}
                    helperText={errors.fName}
                />
                <TextField
                    id="outlined-textarea"
                    label="Middle Name"
                    placeholder="(Optional) Enter Your Middle Name"
                    variant="standard"
                    value={capitalize(mName)}
                    onChange={(e) => setMName(e.target.value)}
                    error={!!errors.mName}
                    helperText={errors.mName}
                />
                <TextField
                    required
                    id="outlined-textarea"
                    label="Last Name"
                    placeholder="Enter Your Last Name"
                    variant="standard"
                    value={capitalize(lName)}
                    onChange={(e) => setLName(e.target.value)}
                    error={!!errors.lName}
                    helperText={errors.lName}
                />
            </div>

            <div>
                <TextField
                    required
                    id="outlined-textarea"
                    label="Email"
                    placeholder="Enter Your Email"
                    variant="standard"
                    value={currentUser?.email}
                    disabled
                />
                <TextField
                    id="filled-textarea"
                    label="Phone Number (with Country Code)"
                    placeholder="Enter Your Phone Number with Country Code"
                    variant="standard"
                    value={pNum}
                    onChange={(e) => setPNum(formatPhoneNumber(e.target.value))}
                    error={!!errors.pNum}
                    helperText={errors.pNum || "Format: +353123456789"}
                />
                {/* <TextField
                    id="standard-select-countries"
                    select
                    label="Contries"
                    defaultValue="Ireland"
                    variant="standard"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                    {countries.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField> */}
                <TextField
                    id="filled-textarea"
                    label="Address"
                    placeholder="Enter Your Address"
                    variant="standard"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    error={!!errors.address}
                    helperText={errors.address}
                />
            </div>
            <CancelSubmitBtn
                cancelHandler={cancelHandler}
                submitHandler={submitHandler}
                cancelText={"Cancel"}
                submitText={"Submit"}
            />
            <Button
                variant="text"
                onClick={logoutHandler}
                startIcon={<LogoutIcon />}
            >
                Log Out
            </Button>
        </Box>
        </>
    )
}




