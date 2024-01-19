import * as React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import Top from './components/header/Top/Top'
import Search from './components/header/Search/Search'
import Home from './components/pages/Home'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { onAuthStateChanged } from "firebase/auth";
import auth from './firebaseConfig';



function App() {

  const [user, setUser] = useState(null);
  
  useEffect(()=>{
    const unRegistered = onAuthStateChanged(auth, (user) =>{
      console.log(user);
      setUser(user);
    })
    // if (!user) {
    //   handleClickOpen();
    // }
    return () => unRegistered();
  })


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
      {
        user ? <div>
          <h3>Your Name: {user?.displayName}</h3>
          <h5>Email: {user?.email}</h5>
          <p>User ID: {user?.uid}</p>
          <p>Phone Number: {user?.phoneNumber}</p>
          <button onClick={()=>auth.signOut()}>Log Out</button>
        </div>
        : ""

      }
        <Top/>
        <Search/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top" element={<Top />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </LocalizationProvider>
  );
}

export default App;
