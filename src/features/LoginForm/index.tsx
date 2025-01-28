import {TitleText} from '../../components/TitleText';
import {TextInput} from '../../components/TextInput';
import {Btn} from '../../components/Button';
import {Box} from '@mui/material';
import {LinkBtn} from '../../components/LinkBtn';

export const LoginForm = () => {
    return (
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
            <Btn text={'Sign in'}/>
            <Box sx={{m: 1}}>
                <LinkBtn text={'Forgot your password?'} to={'/'}/>
                <LinkBtn text={'Sign Up'} to={'/register'}/>
            </Box>
        </form>
    )
}