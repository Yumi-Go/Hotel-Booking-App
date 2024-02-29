import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import useFirestore from '../../../hooks/useFirestore';


export default function BookingUserInfo() {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('CurrentUser')) || {});

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('CurrentUser')) || {});
    }, []);

    // Destructure user details or provide default values
    const { fName = "", mName = "", lName = "", email = "", phoneNumber = "" } = currentUser;

    
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
                    id="outlined-textarea"
                    label="First Name"
                    placeholder="Enter Your First Name"
                    variant="standard"
                    defaultValue={fName}
                    disabled
                />
                <TextField
                    id="outlined-textarea"
                    label="Middle Name"
                    placeholder="(Optional) Enter Your Middle Name"
                    variant="standard"
                    defaultValue={mName}
                    disabled
                />
                <TextField
                    required
                    id="outlined-textarea"
                    label="Last Name"
                    placeholder="Enter Your Last Name"
                    variant="standard"
                    defaultValue={lName}
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
                    defaultValue={email}
                    disabled
                />
                <TextField
                    id="filled-textarea"
                    label="Phone Number"
                    placeholder="Enter Your Phone Number"
                    variant="standard"
                    defaultValue={phoneNumber}
                    disabled
                />
                <TextField
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
                </TextField>
            </div>
        </Box>
    )
}







//// load currentUser info directly from useAuth() without local storage

// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import useAuth from '../../../hooks/useAuth';


// export default function BookingForm() {

//     const { currentUser } = useAuth(); // Destructure currentUser from useAuth

//         // change later..

//     const countries = [
//         { value: 'Ireland', label: 'IR' },
//         { value: 'USA', label: 'US' },
//         { value: 'Korea', label: 'KO' },
//         { value: 'France', label: 'FR' },
//     ];

//     const fName = currentUser?.fName || "";
//     const mName = currentUser?.mName || "";
//     const lName = currentUser?.lName || "";
//     const email = currentUser?.email || "";
//     const phoneNumber = currentUser?.phoneNumber || "";



//     return (
//         <Box
//             component="form"
//             sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
//             noValidate
//             autoComplete="off"
//         >
//             <div>
//                 <TextField
//                     required
//                     id="outlined-textarea"
//                     label="First Name"
//                     placeholder="Enter Your First Name"
//                     variant="standard"
//                     defaultValue={fName}
//                 />
//                 <TextField
//                     id="outlined-textarea"
//                     label="Middle Name"
//                     placeholder="(Optional) Enter Your Middle Name"
//                     variant="standard"
//                     defaultValue={mName}
//                 />
//                 <TextField
//                     required
//                     id="outlined-textarea"
//                     label="Last Name"
//                     placeholder="Enter Your Last Name"
//                     variant="standard"
//                     defaultValue={lName}
//                 />
//             </div>

//             <div>
//                 <TextField
//                     required
//                     id="outlined-textarea"
//                     label="Email"
//                     placeholder="Enter Your Last Name"
//                     variant="standard"
//                     defaultValue={email}
//                 />
//                 <TextField
//                     id="filled-textarea"
//                     label="Phone Number"
//                     placeholder="Enter Your Phone Number"
//                     variant="standard"
//                     defaultValue={phoneNumber}
//                 />
//                 <TextField
//                     id="standard-select-countries"
//                     select
//                     label="Contries"
//                     defaultValue="Ireland"
//                     variant="standard"
//                 >
//                     {countries.map((option) => (
//                         <MenuItem key={option.value} value={option.value}>
//                             {option.label}
//                         </MenuItem>
//                     ))}
//                 </TextField>
//             </div>
//         </Box>
//     )
// }