import {TitleText} from '../../components/TitleText';
import {TextInput} from '../../components/TextInput';
import {Checkbox, FormControlLabel, FormGroup} from '@mui/material';
import {Btn} from '../../components/Button';

export const RegistrationForm = () => {
    return (
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
            <Btn text={'Sign up'}/>
        </form>
    )
}