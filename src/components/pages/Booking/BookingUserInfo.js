import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { capitalize } from '../../../hooks/useFormat';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import useAuth from '../../../hooks/useAuth';


export default function BookingUserInfo({ userInfoEditHandler }) {

    // const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('CurrentUser')) || {});
    const { currentUser } = useAuth();

    // useEffect(() => {
    //     setCurrentUser(JSON.parse(localStorage.getItem('CurrentUser')));
    // }, []);

    // const { fName = "", mName = "", lName = "", email = "", phoneNumber = "" } = currentUser;

    
    // change later..
    const countries = [
        { value: 'Ireland', label: 'IR' },
        { value: 'USA', label: 'US' },
        { value: 'Korea', label: 'KO' },
        { value: 'France', label: 'FR' },
    ];
    
    if (!currentUser) {
        return <div><NoAccountsIcon sx={{ fontSize: 100, color: "grey" }}/></div>
    }
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
                    id="outlined-textarea"
                    label="First Name"
                    placeholder="Enter Your First Name"
                    variant="standard"
                    defaultValue={capitalize(currentUser?.fName)}
                    disabled
                />
                <TextField
                    id="outlined-textarea"
                    label="Middle Name"
                    placeholder="(Optional) Enter Your Middle Name"
                    variant="standard"
                    defaultValue={capitalize(currentUser?.mName)}
                    disabled
                />
                <TextField
                    required
                    id="outlined-textarea"
                    label="Last Name"
                    placeholder="Enter Your Last Name"
                    variant="standard"
                    defaultValue={capitalize(currentUser?.lName)}
                    disabled
                />
            </div>

            <div>
                <TextField
                    required
                    id="outlined-textarea"
                    label="Email"
                    placeholder="Enter Your Last Name"
                    variant="standard"
                    defaultValue={currentUser?.email}
                    disabled
                />
                <TextField
                    id="filled-textarea"
                    label="Phone Number"
                    placeholder="Enter Your Phone Number"
                    variant="standard"
                    defaultValue={currentUser?.pNum}
                    disabled
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
                    id="filled-textarea"
                    label="Address"
                    placeholder="Enter Your Address"
                    variant="standard"
                    defaultValue={currentUser?.address}
                    disabled
                />
            </div>

            <Button
                onClick={userInfoEditHandler}
                variant="text"
                color='secondary'
                size="large"
                endIcon={<EditIcon />}
                sx={{ width: '200px' }}
            >
                Edit
            </Button>


        </Box>
    )
}

