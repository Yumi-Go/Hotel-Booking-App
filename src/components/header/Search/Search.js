/* eslint-disable no-unused-vars */
import * as React from "react";
import { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SetGuests from "./SetGuests";
import InputSearchTerm from "./InputSearchTerm";
import SetDates from "./SetDates";
import { getIds, searchHotels } from "../../../hooks/useHotelAPI";
import { useSearch } from "../../../contexts/SearchContext";


const StyledAppBar = styled(AppBar)(() => ({
    position: "static",
    display: "flex",
    width: "100%",
    alignItems: 'center',
    backgroundColor: "#0a0079",
    color: 'white',
    boxShadow: 0
}));


export default function SearchBar({ onSearch, setHotelName, setCityCode, dates, setDates, guests, setGuests }) {

  
    const searchClick = () => {
      onSearch();
    };


    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar
                // position="static"
                // sx={{
                //     backgroundColor: "#0a0079",
                //     color: 'white',
                //     boxShadow: 0
                // }}
            >
                <Toolbar>
                    <InputSearchTerm msg={ "Hotel Name" } setValue={setHotelName} />
                    <InputSearchTerm msg={ "City or Area" } setValue={setCityCode} />
                    <SetDates dates={dates} setDates={setDates} />
                    <SetGuests guests={guests} setGuests={setGuests} />
                    <button onClick={()=>searchClick()}>Search</button>

                    {/* <Box sx={{ flexGrow: 1 }} /> */}
                </Toolbar>
            </StyledAppBar>
        </Box>
    );
}


