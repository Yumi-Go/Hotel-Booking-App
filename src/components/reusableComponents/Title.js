import Box from '@mui/material/Box';


export default function Title({ title }) {

    return (
        <Box sx={{ width: "100%", height: "100px", color: "indigo" }}>
            <h1>{ title }</h1>
        </Box>
    )
}