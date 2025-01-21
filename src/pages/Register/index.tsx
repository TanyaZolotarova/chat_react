import {Box, Checkbox, Container, FormControlLabel, FormGroup, Link} from '@mui/material';
import {TitleText} from '../../components/TitleText';
import {TextInput} from '../../components/TextInput';
import {LoginBtn} from '../../components/LoginButton';
import {Img} from '../../components/Img';
import {LoginLink} from '../../components/LoginLink';

export const Register = () => {
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
                <TitleText title={'Signing Up'} variant={'h4'} component={'h1'}/>
                <TitleText title={'Personal info'} variant={'subtitle1'} component={'p'}/>
                <TextInput
                    id={'name'}
                    label={'Your Name:'}
                    name={'name'}
                    autoComplete={'name'}
                    autoFocus
                />
                <TextInput
                    id={'email'}
                    label={'Your E-mail:'}
                    name={'email'}
                    type={'email'}
                    autoComplete={'email'}
                />
                <TextInput
                    id={'password'}
                    label={'Password:'}
                    name={'password'}
                    type={'password'}
                    autoComplete={'current-password'}
                />
                <FormGroup>
                    <FormControlLabel required control={<Checkbox color='success'/>}
                                      label='I agree to the terms and conditions'/>
                </FormGroup>
                <LoginBtn text={'Sign up'}/>
            </form>
            <TitleText title={'Or sign up with'} variant={'subtitle1'} component={'p'}/>
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
            <Box sx={{m: 1}}>
                <LoginLink text={'Already have an account? Sign in'} to={'/'}/>
            </Box>

        </Container>
    )
}