import { forwardRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export const TextInput = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
    return (
        <TextField
            {...props}
            inputRef={ref}
            margin='normal'
            fullWidth
            required
        />
    );
})
