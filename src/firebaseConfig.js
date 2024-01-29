import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebase = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "hotel-booking-app-e61c6.firebaseapp.com",
    projectId: "hotel-booking-app-e61c6",
    storageBucket: "hotel-booking-app-e61c6.appspot.com",
    messagingSenderId: "546787576989",
    appId: "1:546787576989:web:74a9863ef52769a02dd874",
    measurementId: "G-MS0REN55YG"
  };

const app = initializeApp(firebase);
const auth = getAuth(app);
const db = getFirestore(app);

const firebaseConfig = { auth, db };

export default firebaseConfig;