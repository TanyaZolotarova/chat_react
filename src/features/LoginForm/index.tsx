import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TitleText } from '../../components/TitleText';
import { TextInput } from '../../components/TextInput';
import { SubmitBtn } from '../../components/SubmitBtn';
import { authenticateUser } from '../../entities/auth/authThunks.ts';
import { AppDispatch } from '../../app/store.ts';

const schema = z.object({
    email: z.string()
        .nonempty('Email is required')
        .email('Invalid email address'),
    password: z.string()
        .nonempty('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Password must be at most 50 characters'),
});

type FormData = z.infer<typeof schema>;

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setFocus,
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange'
    });

    useEffect(() => {
        if (!isValid) {
            const firstErrorField = Object.keys(errors)[0] as keyof FormData;
            setFocus(firstErrorField);
        }
    }, [isValid, errors, setFocus]);

    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = useCallback(async (formData: FormData) => {
        try {
            const data = {
                email: formData.email,
                password: formData.password,
            };
            await dispatch(authenticateUser(data));
            reset();
        } catch (error) {
            console.error('Unexpected error during form submission:', error);
        }
    }, [dispatch, reset]);


    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TitleText
                title='Signing In'
                variant='h4'
                component='h1'
            />
            <TitleText
                title='It is nice to see you back!'
                variant='subtitle1'
                component='p'
            />
            <TextInput
                id='email'
                label='Your E-mail:'
                type='email'
                autoComplete='email'
                autoFocus
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
            <SubmitBtn text='Sign in' disabled={!isValid}/>
        </form>
    );
}
