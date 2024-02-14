/* eslint-disable no-unused-vars */
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

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
  

export default function InputSearchTerm({ msg,  setValue }) {

    const handleChange = (event) => {
        setValue(event.target.value.toUpperCase());
      };

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={ `Enter ${msg}...` }
                onChange={handleChange}
                inputProps={{ "aria-label": "search" }}
            />
        </Search>
    );
}
