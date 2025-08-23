import { InputBase } from '@mui/material';

interface MessageTextInputProps {
    value: string;
    onChange: (text: string) => void;
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const MessageTextInput: React.FC<MessageTextInputProps> = ({ value, onChange, onKeyPress }) => {
    return (
        <InputBase
            placeholder='Message'
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={onKeyPress}
            sx={{
                flex: 1,
                mx: 1,
                fontSize: 16,
            }}
        />
    );
};
