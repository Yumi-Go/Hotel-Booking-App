import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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

const submit = () => {

}

export default function SetGuests() {
    const [adults, setAdults] = React.useState(0);
    const [children, setChildren] = React.useState(0);

    React.useEffect(() => {
        console.log("adults: ", adults);
        console.log("children: ", children);
      }, [adults, children]);

    const guestTypeOptions = ["Adults", "Children"];

    return (
        <StyledFormControl size="small">
            <Select
                displayEmpty
                sx={selectStyles}
                renderValue={() => {
                    if (adults === 0 && children === 0) {
                        return (
                            <GroupIconWrapper>
                                <Box sx={{ display: "flex", color: 'gray' }}>
                                    <GroupIcon sx={{ marginRight: 1, padding: 0 }} />
                                    Guests
                                </Box>
                            </GroupIconWrapper>
                        );
                    }
                    return `Adults: ${adults} / Children: ${children}`;
                    // return selectRenderValue(guestsType);

                }}
            >
                { guestTypeOptions.map((gType, index) => {
                    console.log("_index: ", index);

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
                                    <NumberInput
                                        min={0}
                                        max={99}
                                        changeHandler={
                                            (event, val) => {
                                                gType === 'Adults' ? setAdults(val) : setChildren(val);
                                            }
                                        }
                                    />
                                </Box>
                            </Stack>
                        </MenuItem>
                    );
                })}
                <Button
                    width=""
                    size="small"
                    onClick={submit}>Done</Button>
            </Select>
        </StyledFormControl>
    );
}
