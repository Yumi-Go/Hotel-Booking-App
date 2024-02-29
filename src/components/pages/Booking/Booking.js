import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import BookingDetail from './BookingDetail';
import Button from '@mui/material/Button';
import CancelSubmitBtn from '../../reusableComponents/CancelSubmitBtn';
import EditIcon from '@mui/icons-material/Edit';
import BookingUserInfo from './BookingUserInfo';




export default function Booking() {

    const navigate = useNavigate();

    const cancelHandler = () => {
        // navigate('/');
        navigate(-1);

    }

    const submitHandler = () => {

    }

    const userInfoEditHandler = () => {
        navigate('/account');
    }

    return (
        <div>
            <h1>Booking</h1>
            <BookingUserInfo />
            <Button
                onClick={userInfoEditHandler}
                variant="text"
                color='secondary'
                size="large"
                endIcon={<EditIcon />}
                sx={{ width: '200px' }}
            >
                Edit
            </Button>
            <Divider sx={{p: 10, pt: 10, pb: 5}}>
                <h3>Offer Detail</h3>
                {/* <Button
                    onClick={userInfoEditHandler}
                    variant="contained"
                    color='secondary'
                    size="large"
                    startIcon={<FormatListBulletedIcon />}
                    sx={{ width: '200px' }}
                >
                Booking Detail
                </Button> */}
                {/* <Chip label="Booking Detail" size="medium" color="secondary" variant="outlined"/> */}
            </Divider>
            <BookingDetail/>
            <CancelSubmitBtn cancelHandler={cancelHandler} submitHandler={submitHandler} />
        </div>
    )
}