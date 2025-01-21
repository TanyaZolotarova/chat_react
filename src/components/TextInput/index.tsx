import {TextField} from '@mui/material';

interface TextInputProps {
    id: string;
    label: string;
    name: string;
    autoComplete?: string;
    autoFocus?: boolean;
    value?: string;
    type?: string;
}

export const TextInput: React.FC<TextInputProps> = ({id, label, name, autoComplete, value, autoFocus}) => {
    return (
        <TextField
            id={id}
            label={label}
            name={name}
            autoComplete={autoComplete}
            value={value}
            margin='normal'
            autoFocus={autoFocus}
            fullWidth
            required/>
    )
}