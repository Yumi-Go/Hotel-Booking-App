/* eslint-disable no-unused-vars */
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import Box from "@mui/material/Box";
import GroupIcon from '@mui/icons-material/Group';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import NumberInput from "../../reusableComponents/NumberInput";
  

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.9),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(3),
    width: "300px"
}));


const GroupIconWrapper = styled("div")(() => ({
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    alignItems: "center",
    justifyContent: "center",
}));

const selectStyles = {
    backgroundColor: 'white',
    ".MuiOutlinedInput-notchedOutline": {
        },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "black",
        color: "black",
        borderWidth: "thin",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "black",
        color: "black",
        borderWidth: "thin",
    },
};

export default function SetGuests() {
    const [guestsType, setGuestsType] = React.useState('');
    const [adultsNum, setAdultsNum] = React.useState(0);
    const [childrenNum, setChildrenNum] = React.useState(0);

    React.useEffect(() => {
        console.log("guestsType: ", guestsType);
        console.log("adultsNum: ", adultsNum);
        console.log("childrenNum: ", childrenNum);
      }, [guestsType, adultsNum, childrenNum]);

    const guestTypeOptions = ["Adults", "Children"];

    const guestsTypeHandleChange = (event) => {
        setGuestsType(event.target.value.length > 0 ? event.target.value : "");
    };

    const guestsNumHandleChange = (event) => {
        console.log("_guestsType: ", guestsType);
        if (guestsType === 'Adults') {
            setAdultsNum(!isNaN(event.target.value) ? event.target.value : 0);
            console.log("event.target.value(Adults): ", event.target.value);
        } else if (guestsType === 'Children') {
            setChildrenNum(!isNaN(event.target.value) ? event.target.value : 0);
            console.log("event.target.value(Children): ", event.target.value);
        }
    };

    return (
        <StyledFormControl size="small">
            <Select
                // multiple
                displayEmpty
                value={guestsType}
                onChange={guestsTypeHandleChange}
                sx={selectStyles}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return (
                            <GroupIconWrapper>
                                <Box sx={{ display: "flex", color: 'gray' }}>
                                    <GroupIcon sx={{ marginRight: 1, padding: 0 }} />
                                    Guests
                                </Box>
                            </GroupIconWrapper>
                        );
                    }
                    return selected;
                    // return selected.join(', ');
                }}
            >
                { guestTypeOptions.map((gType, index) => {
                    return (
                        <MenuItem value={gType} key={index}>
                            <Stack
                                direction="row"
                                divider={<Divider orientation="vertical" flexItem />}
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                            >
                                <Box sx={{width: '55px'}}>
                                    {gType}
                                </Box>
                                <Box>
                                    <NumberInput min={1} max={99} changeHandler={guestsNumHandleChange} />
                                </Box>
                            </Stack>
                        </MenuItem>
                    );
                })}
                <Button width="" size="small">Done</Button>
            </Select>
        </StyledFormControl>
    );
}
