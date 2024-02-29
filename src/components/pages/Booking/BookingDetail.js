import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';



export default function BookingDetail() {

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { px: 50, width: '40ch' } }}
            noValidate
            autoComplete="off"
        >
            <div>
                <Stack
                    sx={{
                        width: '100%',
                        borderRadius: 1,
                        bgcolor: 'red',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        },
                    }}
                >
                    Booking Detail is here
                </Stack>
            {/* </Root> */}
            </div>
        </Box>
    )
}