import { useState, useEffect } from 'react';
import firebaseConfig from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const { auth } = firebaseConfig;

export default function useAuth() {

    const [currentUser, setCurrentUser] = useState(auth.currentUser);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                localStorage.setItem('CurrentUser', JSON.stringify(user));
            } else {
                console.log("No user logged in.");
            }
        });
    }, [currentUser]);

    const logOut = async () => {
        try {
            await signOut(auth);
            setCurrentUser(null);
            localStorage.removeItem('CurrentUser');
            console.log("Logged out successfully!");
        } catch (error) {
            console.log("Log out Error: ", error);
        }
    };

    return { currentUser, logOut };
};
