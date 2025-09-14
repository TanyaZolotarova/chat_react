import { InputBase } from '@mui/material';

interface MessageInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onKeyDown, onChange, value }) => {
    return (
        <InputBase
            placeholder='Message'
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
