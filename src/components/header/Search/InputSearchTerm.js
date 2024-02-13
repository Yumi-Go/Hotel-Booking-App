/* eslint-disable no-unused-vars */
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "../../../contexts/SearchContext";

const Search = styled("div")(({ theme }) => ({
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
  

// App.js의 Grand-child이므로, props 대신 context 사용 시도해보기!
export default function InputSearchTerm({ msg }) {

    const { hotelName, setHotelName, cityArea, setCityArea } = useSearch();

    const handleChange = (e) => {
        if (msg === "Hotel Name") {
            setHotelName(e.target.value);
        } else if (msg === "City or Area") {
            setCityArea(e.target.value);
        }
    };

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                value={msg === "Hotel Name" ? hotelName : cityArea}
                onChange={handleChange}
                placeholder={ "Enter " + msg + "..." }
                inputProps={{ "aria-label": "search" }}
            />
        </Search>
    );
}
