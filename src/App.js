import React, { useState, useEffect } from 'react';
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
import HotelDetail from './components/pages/HotelDetail';
import { useDate } from './hooks/useDate';


export default function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [hotelName, setHotelName] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [dates, setDates] = useState({
    checkInDate: null,
    checkOutDate: null,
  });
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
  });
  
  const formattedCheckInDate = useDate(dates.checkInDate);
  const formattedCheckOutDate = useDate(dates.checkOutDate);

  useEffect(() => {
    console.log("searchResult updated in App:", searchResult);
  }, [searchResult]);

  useEffect(() => {
    console.log("hotelName updated in App:", hotelName);
  }, [hotelName]);

  useEffect(() => {
    console.log("cityCode updated in App:", cityCode);
  }, [cityCode]);


  useEffect(() => {
    console.log(`dates updated in App: checkIn ${dates.checkInDate}, checkOut ${dates.checkOutDate}`);
    console.log("Formatted checkInDate: ", formattedCheckInDate);
    console.log("Formatted checkOutDate: ", formattedCheckOutDate);
}, [dates, formattedCheckInDate, formattedCheckOutDate]);



  useEffect(() => {
    console.log(`guests updated in App: adults ${guests.adults}, children ${guests.children}`);
  }, [guests]);


  const handleSearch = async () => {
    try {
      const searchConditions = ({
        adults: 2,
        children: 0,
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        roomQuantity: 1,
        priceRange: "100-1500",
        currency: "EUR"
      });

      const response = await searchHotels(hotelName, cityCode, searchConditions);
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
            <Search
              onSearch={handleSearch}
              setHotelName={setHotelName}
              setCityCode={setCityCode}
              dates={dates}
              setDates={setDates}
              guests={guests}
              setGuests={setGuests}
            />
            <Routes>
              <Route path="/" element={<Home searchResult={searchResult} />} />






              {/* for testing.. finishing testing, uncomment above Home component line */}
              {/* <Route path="/" element={<HotelDetail hotelObj={hotelObj} />} /> */}







              <Route path="/account" element={<Account />} />
              <Route path="/history" element={<BookingHistory />} />
            </Routes>
          </Box>
      </LocalizationProvider>
    </AuthProvider>
  );
}
