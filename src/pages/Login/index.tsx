import {Box, Container, Link} from '@mui/material';
import {TitleText} from '../../components/TitleText';
import {LoginBtn} from '../../components/LoginButton';
import {Img} from '../../components/Img';
import {TextInput} from '../../components/TextInput';
import {LoginLink} from '../../components/LoginLink';

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
            <form>
                <TitleText title={'Signing In'} variant={'h4'} component={'h1'}/>
                <TitleText title={'It is nice to see you back!'} variant={'subtitle1'} component={'p'}/>
                <TextInput
                    id={'email'}
                    label={'Your E-mail:'}
                    name={'email'}
                    type={'email'}
                    autoComplete={'email'}
                    autoFocus
                />
                <TextInput
                    id={'password'}
                    label={'Password:'}
                    name={'password'}
                    type={'password'}
                    autoComplete={'current-password'}
                />
                <LoginBtn text={'Sign in'}/>
                <Box sx={{m: 1}}>
                    <LoginLink text={'Forgot your password?'} to={'/'}/>
                    <LoginLink text={'Sign Up'} to={'/register'}/>
                </Box>
            </form>
            <TitleText title={'Or sign in with'} variant={'subtitle1'} component={'p'}/>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    mt: 1,
                }}
            >
                <Link href='https://accounts.google.com' target='_blank'>
                    <Img src={'/assets/img/google.png'} alt={'google logo'}/>
                </Link>
            </Box>
        </Container>
    )
}