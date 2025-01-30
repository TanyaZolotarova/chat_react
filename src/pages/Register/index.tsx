import { Box, Container } from '@mui/material';
import { GoogleAuth } from '../../features/GoogleAuth';
import { RegistrationForm } from '../../features/RegistrationForm';
import { TitleText } from '../../components/TitleText';
import { LinkBtn } from '../../components/LinkBtn';


export const Register = () => {
    return (
        <Container
            component='main'
            maxWidth='xs'
            sx={{
            mt: 4,
            p: 4,
            border: '1px solid #ccc',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            }}
        >
            <RegistrationForm/>
            <TitleText
                title={ 'Or sign up with' }
                variant={ 'subtitle1' }
                component={ 'p' }
            />
            <GoogleAuth/>
            <Box
                sx={{ m: 1 }}
            >
                <LinkBtn
                    text= 'Already have an account? Sign in'
                    to={ '/' }
                />
            </Box>
        </Container>
    )
}
