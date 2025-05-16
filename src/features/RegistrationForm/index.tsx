import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Checkbox, FormControlLabel, FormGroup, FormHelperText } from '@mui/material';
import { TitleText } from '../../components/TitleText';
import { TextInput } from '../../components/TextInput';
import { SubmitBtn } from '../../components/SubmitBtn';
import { registerUser } from '../../components/AuthApi'
import { setUserData } from '../../entities/user/userSlice.ts';
import { AppDispatch } from '../../app/store.ts';

const schema = z.object({
    name: z.string()
        .nonempty('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(16, 'Name must be at most 16 characters'),
    email: z.string()
        .nonempty('Email is required')
        .email('Invalid email address'),
    password: z.string()
        .nonempty('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Password must be at most 50 characters'),
    terms: z.boolean().refine(value => value === true, {
        message: 'You must accept the terms and conditions'
    })
});

type FormData = z.infer<typeof schema>;

export const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setFocus,
        setValue,
        watch,
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange'
    });

    const dispatch = useDispatch<AppDispatch>();
    const termsValue = watch('terms', false);

    useEffect(() => {
        if (!isValid) {
            const firstErrorField = Object.keys(errors)[0] as keyof FormData;
            setFocus(firstErrorField);
        }
    }, [isValid, errors, setFocus]);

    const onSubmit = async (formData: FormData) => {

        try {
            const data = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            };
            const response = await registerUser(data);

            dispatch(setUserData({
                name: data.name,
                email: data.email,
                avatar: ''
            }));

            reset();
        } catch (error) {
            console.error('Error submitting form:', error);
        }

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
                {...register('name', {
                    onChange: (e) => setValue('name', e.target.value.replace(/\s/g, ''), { shouldValidate: true })
                })}
                error={!!errors.name}
                helperText={errors.name?.message || ''}
            />
            <TextInput
                id='email'
                label='Your E-mail:'
                type='email'
                autoComplete='email'
                {...register('email', {
                    onChange: (e) => setValue('email', e.target.value.replace(/\s/g, ''), { shouldValidate: true })
                })}
                error={!!errors.email}
                helperText={errors.email?.message || ''}
            />
            <TextInput
                id='password'
                label='Password:'
                type='password'
                autoComplete='current-password'
                {...register('password', {
                    onChange: (e) => setValue('password', e.target.value.replace(/\s/g, ''), { shouldValidate: true })
                })}
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
