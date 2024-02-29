import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';




export default function CancelSubmitBtn({ cancelHandler, submitHandler }) {


    return (
        <div>
            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{ py: 10 }}
            >
                <Button
                    onClick={cancelHandler}
                    variant="outlined"
                    size="large"
                    startIcon={<CloseIcon />}
                    sx={{ width: '200px' }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={submitHandler}
                    variant="contained"
                    size="large"
                    endIcon={<DoubleArrowIcon />}
                    sx={{ width: '200px' }}
                >
                    Submit
                </Button>
            </Stack>
        </div>
    )
}