import { InputBase } from '@mui/material';
import { forwardRef } from 'react';

interface MessageInputProps {
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export const MessageInput = forwardRef<HTMLInputElement, MessageInputProps>(
    ({ onKeyDown, placeholder }, ref) => {
        return (
            <InputBase
                inputRef={ref}
                placeholder={placeholder}
                onKeyDown={onKeyDown}
                sx={{
                    flex: 1,
                    mx: 1,
                    fontSize: 16,
                }}
            />
        );
    }
);
