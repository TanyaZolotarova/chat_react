import { Box, Link } from '@mui/material';
import { Img } from '../../components/Img';

export const GoogleAuth = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                mt: 1,
            }}
        >
            <Link href='https://accounts.google.com' target='_blank'>
                <Img src='/assets/img/google.png' alt='google logo'/>
            </Link>
        </Box>
    );
}
