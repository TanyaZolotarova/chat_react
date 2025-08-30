import { InputBase } from '@mui/material';

interface MessageInputProps {
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onKeyDown }) => {
    return (
        <InputBase
            placeholder='Message'
            onKeyDown={onKeyDown}
            sx={{
                flex: 1,
                mx: 1,
                fontSize: 16,
            }}
        />
    );
};
