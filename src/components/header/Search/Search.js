/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import SetGuests from "./SetGuests";
import SetDates from "./SetDates";


const StyledAppBar = styled(AppBar)(() => ({
    position: "static",
    display: "flex",
    width: "100%",
    alignItems: 'center',
    backgroundColor: "#0a0079",
    color: 'white',
    boxShadow: 0
}));

const SearchInput = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.35),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.4),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(3),
    width: "auto"
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "auto",

    },
}));


export default function Search({ onSearch, setHotelName, setCityCode, dates, setDates, guests, setGuests }) {
    const hotelNameRef = useRef(null);
    const cityCodeRef = useRef(null);

    const handleHotelNameChange = (event) => {
        setHotelName(event.target.value.toUpperCase());
    };

    const handleCityCodeChange = (event) => {
        setCityCode(event.target.value.toUpperCase());
    };
  
    const searchClick = () => {
        if (!cityCodeRef.current.value) {
            alert("City or Area is required");
            return;
        }
        onSearch();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar>
                <Toolbar>
                    <SearchInput>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Enter Hotel Name..."
                            onChange={handleHotelNameChange}
                            inputProps={{ "aria-label": "search" }}
                            inputRef={hotelNameRef}
                        />
                    </SearchInput>
                    <SearchInput>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Enter City or Area..."
                            onChange={handleCityCodeChange}
                            inputProps={{ "aria-label": "search", required: true }}
                            inputRef={cityCodeRef}
                        />
                    </SearchInput>
                    <SetDates dates={dates} setDates={setDates} />
                    <SetGuests guests={guests} setGuests={setGuests} />
                    <button onClick={()=>searchClick()}>Search</button>

                    {/* <Box sx={{ flexGrow: 1 }} /> */}
                </Toolbar>
            </StyledAppBar>
        </Box>
    );
}


