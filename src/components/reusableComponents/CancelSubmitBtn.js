import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';



export default function CancelSubmitBtn({ cancelHandler, submitHandler, cancelText, submitText }) {


    return (
        <div>
            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{ py: 5 }}
            >
                <Button
                    onClick={cancelHandler}
                    variant="outlined"
                    size="large"
                    startIcon={<CloseIcon />}
                    sx={{ width: '200px' }}
                >
                    {cancelText}
                </Button>
                <Button
                    onClick={submitHandler}
                    variant="contained"
                    size="large"
                    endIcon={<DoubleArrowIcon />}
                    sx={{ width: '200px' }}
                >
                    {submitText}
                </Button>
            </Stack>
        </div>
    )
}