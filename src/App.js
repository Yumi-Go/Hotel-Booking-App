import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Top from './components/header/Top/Top'
import Search from './components/header/Search/Search'
import Home from './components/pages/Home'
import Account from './components/pages/Account';
import BookingHistory from './components/pages/BookingHistory';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthProvider } from './AuthContext';
import { Box } from '@mui/material';
import { searchHotels } from './hooks/useHotelAPI';


export default function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [cityCode, setCityCode] = useState("PAR");
  const [name, setName] = useState("WESTERN");
  const [searchConditions, setSearchConditions] = useState({
    adults: 2,
    children: 0,
    checkInDate: '2024-03-22',
    checkOutDate: '2024-03-23',
    roomQuantity: 1,
    priceRange: "100-1500",
    currency: "EUR"
  });

  const handleSearch = async () => {
    try {
      const response = await searchHotels(name, cityCode, searchConditions);
      setSearchResult(response);
      console.log("Updated searchResult in App:", response);
    } catch (error) {
      console.error("Error in handleSearch: ", error);
      setSearchResult([]);
    }
  };

  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box className="App">
          <Top />
          <Search onSearch={handleSearch} />
          <Routes>
            <Route path="/" element={<Home searchResult={searchResult} photos={photos} />} />
            <Route path="/account" element={<Account />} />
            <Route path="/history" element={<BookingHistory />} />
          </Routes>
        </Box>
      </LocalizationProvider>
    </AuthProvider>
  );
}
