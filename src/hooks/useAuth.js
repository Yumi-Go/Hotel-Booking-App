import { useState, useEffect } from 'react';
import firebaseConfig from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import useFirestore from './useFirestore';


const { auth } = firebaseConfig;

export default function useAuth() {

    const { getUserInfoByUID } = useFirestore();
    const [currentUser, setCurrentUser] = useState(auth.currentUser);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserInfoByUID(user.uid)
                .then(userData => {
                    setCurrentUser(userData);
                    localStorage.setItem('CurrentUser', JSON.stringify(userData));
                })
            } else {
                console.log("No user logged in.");
            }
        });
    }, []);

    const logOut = async () => {
        try {
            await signOut(auth);
            setCurrentUser(null);
            localStorage.removeItem('CurrentUser');
            // localStorage.setItem('CurrentUser', null);
            console.log("Logged out successfully!");
        } catch (error) {
            console.log("Log out Error: ", error);
        }
    };

    return { currentUser, logOut };
};
