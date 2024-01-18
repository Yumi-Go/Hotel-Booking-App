import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function LoginPopup({ isOpen, closeHandler }) {
    return (
        <Dialog
        open={isOpen}
        onClose={closeHandler}
        PaperProps={{
        component: 'form',
        onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            closeHandler();
        },
        }}
    >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
        <DialogContentText>
            This is login popup
        </DialogContentText>
        <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
        />
        </DialogContent>
        <DialogActions>
        <Button onClick={closeHandler}>Cancel</Button>
        <Button type="submit">Log In</Button>
        </DialogActions>
    </Dialog>

    );
}
