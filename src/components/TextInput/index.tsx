import { TextField, TextFieldProps } from '@mui/material';

export const TextInput: React.FC<TextFieldProps> = ( props) => {

    return (
        <TextField
            {...props}
            margin='normal'
            fullWidth
            required
        />
    );
}
