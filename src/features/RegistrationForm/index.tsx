import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Checkbox, FormControlLabel, FormGroup, FormHelperText } from '@mui/material';
import { TitleText } from '../../components/TitleText';
import { TextInput } from '../../components/TextInput';
import { SubmitBtn } from '../../components/SubmitBtn';


const schema = z.object({
    name: z.string().nonempty('Name is required').min(2, 'Name must be at least 2 characters'),
    email: z.string().nonempty('Email is required').email('Invalid email address'),
    password: z.string().nonempty('Password is required').min(6, 'Password must be at least 6 characters'),
    terms: z.boolean().refine(value => value === true, {
        message: 'You must accept the terms and conditions'
    })
});

type formData = z.infer<typeof schema>;

export const RegistrationForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setFocus,
        setValue,
        watch
    } = useForm<formData>({
        resolver: zodResolver(schema),
        mode: 'onChange'
    });

    const termsValue = watch('terms', false);

    useEffect(() => {
        if (!isValid) {
            const firstErrorField = Object.keys(errors)[0] as keyof formData;
            setFocus(firstErrorField);
        }
    }, [isValid, errors, setFocus]);

    const onSubmit = (data: formData) => {
        console.log('Form Data:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TitleText
                title='Signing Up'
                variant='h4'
                component='h1'
            />
            <TitleText
                title='Personal info'
                variant='subtitle1'
                component='p'
            />
            <TextInput
                id='name'
                label='Your Name:'
                autoComplete='name'
                autoFocus
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message || ''}
            />
            <TextInput
                id='email'
                label='Your E-mail:'
                type='email'
                autoComplete='email'
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message || ''}
            />
            <TextInput
                id='password'
                label='Password:'
                type='password'
                autoComplete='current-password'
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message || ''}
            />
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={termsValue}
                            onChange={(e) => setValue('terms', e.target.checked, { shouldValidate: true })}
                            color='success'
                        />
                    }
                    label='I agree to the terms and conditions'
                />
                {errors.terms && (<FormHelperText error>{errors.terms.message}</FormHelperText>)}
            </FormGroup>
            <SubmitBtn text='Sign up' disabled={!isValid}/>
        </form>
    );
}
