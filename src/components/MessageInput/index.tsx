import { InputBase } from '@mui/material';

interface MessageInputProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onKeyDown, value, onChange, placeholder }) => {
    return (
        <InputBase
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            sx={{
                flex: 1,
                mx: 1,
                fontSize: 16,
            }}
        />
    );
};
