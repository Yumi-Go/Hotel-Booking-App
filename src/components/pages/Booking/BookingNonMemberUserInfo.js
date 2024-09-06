import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function BookingNonMemberUserInfo({ setNonMemberValidation, errors, setErrors }) {

    const [fName, setFName] = useState('');
    const [mName, setMName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [pNum, setPNum] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const validate = () => {
            let errMsg = {};
            if (!fName) errMsg.fName = "First Name is required.";
            if (!lName) errMsg.lName = "Last Name is required.";
            if (!email) errMsg.email = "Email is required.";
            if (!password) errMsg.password = "Password is required.";
            if (password !== confirmPassword) errMsg.confirmPassword = "Passwords do not match.";
            setErrors(errMsg);
            if (Object.keys(errMsg).length === 0) setNonMemberValidation(true);
        };
    
        validate();
    }, [fName, mName, lName, email, pNum, address, password, confirmPassword, setErrors, setNonMemberValidation]);

    // change later..
    const countries = [
        { value: 'Ireland', label: 'IR' },
        { value: 'USA', label: 'US' },
        { value: 'Korea', label: 'KO' },
        { value: 'France', label: 'FR' },
    ];

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
            noValidate
            autoComplete="off"
        >

            <div>
                <TextField
                    required
                    id="non-member-fname-textarea"
                    label="First Name"
                    placeholder="Enter Your First Name"
                    variant="standard"
                    onChange={(e) => setFName(e.target.value)}
                    error={!!errors.fName} // !!errors.fName converts the value of errors.fName to a boolean. If errors.fName is a non-empty string (indicating an error message), !!errors.fName will be true. If errors.fName is undefined or an empty string, !!errors.fName will be false.
                    helperText={errors.fName}
                />
                <TextField
                    id="non-member-mname-textarea"
                    label="Middle Name"
                    placeholder="(Optional) Enter Your Middle Name"
                    variant="standard"
                    onChange={(e) => setMName(e.target.value)}
                />
                <TextField
                    required
                    id="non-member-lname-textarea"
                    label="Last Name"
                    placeholder="Enter Your Last Name"
                    variant="standard"
                    onChange={(e) => setLName(e.target.value)}
                    error={!!errors.lName}
                    helperText={errors.lName}
                />
            </div>

            <div>
                <TextField
                    required
                    id="non-member-email-textarea"
                    label="Email"
                    placeholder="Enter Your Last Name"
                    variant="standard"
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    id="non-member-pnum-textarea"
                    label="Phone Number"
                    placeholder="Enter Your Phone Number"
                    variant="standard"
                    onChange={(e) => setPNum(e.target.value)}
                />
                {/* <TextField
                    id="standard-select-countries"
                    select
                    label="Contries"
                    defaultValue="Ireland"
                    variant="standard"
                    disabled
                >
                    {countries.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField> */}
                <TextField
                    id="non-member-address-textarea"
                    label="Address"
                    placeholder="Enter Your Address"
                    variant="standard"
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>

            <div>
                <TextField
                    required
                    id="non-member-pwd-textarea"
                    label="Password"
                    type="password"
                    placeholder="Enter Your Password"
                    variant="standard"
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText= { errors.password ? errors.password : "Password for non-member booking inquiry" }

                />
                <TextField
                    required
                    id="non-member-confirmpwd-textarea"
                    label="Confirm Password"
                    type="password"
                    placeholder="Enter Your Password"
                    variant="standard"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!errors.confirmPassword}
                    helperText={ errors.confirmPassword ? errors.confirmPassword : "Enter your password again." }
                />
            </div>

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


        </Box>
    )
}

