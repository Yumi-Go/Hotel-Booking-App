import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Top from './components/header/Top/Top'
import Search from './components/header/Search/Search'
import Home from './components/pages/Home'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthProvider } from './AuthContext';


export default function App() {

  return (
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="App">
            <Top/>
            <Search/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/top" element={<Top />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
        </LocalizationProvider>
      </AuthProvider>
  );
}
