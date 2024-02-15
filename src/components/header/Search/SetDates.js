/* eslint-disable no-unused-vars */
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';


const CheckInDatePicker = styled(DatePicker)(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.9),
    },
    marginRight: 5,
    marginLeft: theme.spacing(3),
    width: "auto",
}));

const CheckOutDatePicker = styled(DatePicker)(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.9),
    },
    marginRight: theme.spacing(2),
    marginLeft: 5,
    width: "auto",

}));


export default function SetDates({ dates, setDates }) {

    const handleCheckInDateChange = (newDate) => {
        setDates((prevDates) => ({ ...prevDates, checkInDate: new Date(newDate) }));
    };
    
    const handleCheckOutDateChange = (newDate) => {
        setDates((prevDates) => ({ ...prevDates, checkOutDate: new Date(newDate) }));
    };

    return (
        <Stack direction="row" spacing={0}>
            <CheckInDatePicker
                value={dates.checkInDate}
                onChange={handleCheckInDateChange}
                slotProps={{ textField: { size: 'small' } }}
            />
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block', padding: 0, margin: 0, width: '10px'} }}
            >
                -
            </Typography>
            <CheckOutDatePicker
                value={dates.checkOutDate}
                onChange={handleCheckOutDateChange}
                slotProps={{ textField: { size: 'small' } }}                        
            />
        </Stack>
    );
}
