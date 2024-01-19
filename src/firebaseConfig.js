import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "***REMOVED***",
    authDomain: "hotel-booking-app-e61c6.firebaseapp.com",
    projectId: "hotel-booking-app-e61c6",
    storageBucket: "hotel-booking-app-e61c6.appspot.com",
    messagingSenderId: "546787576989",
    appId: "1:546787576989:web:74a9863ef52769a02dd874",
    measurementId: "G-MS0REN55YG"
  };

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(initializeApp(firebaseConfig));

export default auth;