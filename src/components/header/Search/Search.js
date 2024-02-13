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


const StyledAppBar = styled(AppBar)(() => ({
    position: "static",
    display: "flex",
    width: "100%",
    alignItems: 'center',
    backgroundColor: "#0a0079",
    color: 'white',
    boxShadow: 0
}));


export default function SearchBar({ onSearch }) {
  
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
                    <InputSearchTerm msg={ "Hotel Name" } />
                    <InputSearchTerm msg={ "City or Area" } />
                    <SetDates />
                    <SetGuests />
                    <button onClick={()=>searchClick()}>Search</button>

                    {/* <Box sx={{ flexGrow: 1 }} /> */}
                </Toolbar>
            </StyledAppBar>
        </Box>
    );
}


