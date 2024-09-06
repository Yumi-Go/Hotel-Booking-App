// import { useState, useEffect } from "react";
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// export default function PrimarySearchAppBar() {
//     const [open, setOpen] = useState(false);
//     const handleClickOpen = () => {
//          setOpen(true);
//     };
//     const handleClose = () => {
//         setOpen(false);
//     };

//     const menuId = 'primary-search-account-menu';
    
//     return (
//         <Box>
//             <IconButton
//                 size="large"
//                 edge="end"
//                 aria-label="account of current user"
//                 aria-controls={menuId}
//                 aria-haspopup="true"
//                 onClick={handleClickOpen}
//                 color="inherit"
//             >
//                 <AccountCircle />
//             </IconButton>
//                 <Dialog
//                     open={open}
//                     onClose={handleClose}
//                     PaperProps={{
//                     component: 'form',
//                     onSubmit: (event) => {
//                         event.preventDefault();
//                         const formData = new FormData(event.currentTarget);
//                         const formJson = Object.fromEntries(formData.entries());
//                         const email = formJson.email;
//                         console.log(email);
//                         handleClose();
//                     },
//                     }}
//                 >
//                     <DialogTitle>Subscribe</DialogTitle>
//                     <DialogContent>
//                     <DialogContentText>
//                         To subscribe to this website, please enter your email address here. We
//                         will send updates occasionally.
//                     </DialogContentText>
//                     <TextField
//                         autoFocus
//                         required
//                         margin="dense"
//                         id="name"
//                         name="email"
//                         label="Email Address"
//                         type="email"
//                         fullWidth
//                         variant="standard"
//                     />
//                     </DialogContent>
//                     <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                     <Button type="submit">Log In</Button>
//                     </DialogActions>
//                 </Dialog>
//         </Box>
//     );
// }