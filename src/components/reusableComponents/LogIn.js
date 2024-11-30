import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import firebaseConfig from '../../firebaseConfig';
import useFirestore from '../../hooks/useFirestore';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';



export default function LogIn() {

    const { auth } = firebaseConfig;
    const { addUser } = useFirestore();
    const { userStateObserver } = useAuth();
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));


    useEffect(() => {

        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    addUser(authResult.user.uid, authResult.user.email);
                    userStateObserver();
                    window.location.reload();
                    return false;
                },
                uiShown: function() {
                    document.getElementById('loader').style.display = 'none';
                }
            },
            signInFlow: 'popup',
            signInSuccessUrl: '/',
            signInOptions: [
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: false
                },
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ],
        };
        var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
        ui.start('#firebaseui-auth-container', uiConfig);
    }, [auth]);


    if (currentUser) {
        return <Navigate to="/" replace />;
    }
    return (
        <div>
            <div id="firebaseui-auth-container"></div>
            <div id="loader" className="text-center">Loading...</div>
        </div>
    );
}
