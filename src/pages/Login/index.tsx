import {Container} from '@mui/material';
import {TitleText} from '../../components/TitleText';
import {LoginForm} from '../../features/LoginForm';
import {GoogleAuth} from '../../features/GoogleAuth';

export const Login = () => {

    return (
        <Container component='main' maxWidth='xs' sx={{
            mt: 4,
            p: 4,
            border: '1px solid #ccc',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
        }}>
            <LoginForm/>
            <TitleText title={'Or sign in with'} variant={'subtitle1'} component={'p'}/>
            <GoogleAuth/>
        </Container>
    )
}