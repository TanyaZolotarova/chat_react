import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Checkbox, FormControlLabel, FormGroup, FormHelperText } from '@mui/material';
import { TitleText } from '../../components/TitleText';
import { TextInput } from '../../components/TextInput';
import { SubmitBtn } from '../../components/SubmitBtn';
import { hashPassword } from '../../entities/utils.ts';
import { registerUser } from '../../services/apiAuth.ts'


const schema = z.object({
    name: z.string()
        .nonempty('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(7, 'Name must be at most 7 characters')
        .refine(value => value.trim().length > 0, {
            message: 'Name cannot be just spaces'
        }),
    email: z.string()
        .nonempty('Email is required')
        .email('Invalid email address')
        .refine(value => value.trim().length > 0, {
            message: 'Email cannot be just spaces'
        }),
    password: z.string()
        .nonempty('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(12, 'Password must be at most 12 characters')
        .refine(value => value.trim().length > 0, {
            message: 'Password cannot be just spaces'
        }),
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

    const termsValue = watch('terms', false);

    useEffect(() => {
        if (!isValid) {
            const firstErrorField = Object.keys(errors)[0] as keyof FormData;
            setFocus(firstErrorField);
        }
    }, [isValid, errors, setFocus]);

    const onSubmit = async ({ terms, ...data  }: FormData) => {
        try {
            const hashedPassword = await hashPassword(data.password);
            const securedData = { ...data, password: hashedPassword };
            const response = await registerUser(securedData);
            console.log('Form Data:', response);
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
