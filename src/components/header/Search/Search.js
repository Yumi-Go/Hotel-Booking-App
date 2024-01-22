/* eslint-disable no-unused-vars */
import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SetGuests from "./SetGuests";
import InputSearchTerm from "./InputSearchTerm";
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

export default function PrimarySearchAppBar() {

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

                    {/* <Box sx={{ flexGrow: 1 }} /> */}
                </Toolbar>
            </StyledAppBar>
        </Box>
    );
}


