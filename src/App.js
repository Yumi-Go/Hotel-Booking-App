import React from 'react';
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


export default function App() {

  return (
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className="App">
            <Top/>
            <Search/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<Account />} />
              <Route path="/history" element={<BookingHistory />} />
            </Routes>
          </Box>
        </LocalizationProvider>
      </AuthProvider>
  );
}
