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


export default function LoginPopup({ isOpen, closeHandler }) {

    const { auth } = firebaseConfig;
    const { addUser } = useFirestore();

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                var uiConfig = {
                    callbacks: {
                        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                            addUser(authResult.user.uid, authResult.user.email);
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
            }, 500);

            return () => {
                clearTimeout(timer);
                var ui = firebaseui.auth.AuthUI.getInstance();
                if (ui) {
                    ui.delete();
                }
            }
        }

    }, [isOpen, addUser, auth]);


    return (
        <Dialog
            open={isOpen}
            onClose={closeHandler}
            // maxWidth={'xs'}
            // fullWidth={true}
        >
            <DialogTitle>Log In</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This is login popup
                </DialogContentText>
                <div id="firebaseui-auth-container"></div>
                <div id="loader" className="text-center">Loading...</div>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeHandler}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
