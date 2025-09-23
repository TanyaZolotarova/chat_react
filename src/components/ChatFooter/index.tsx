import { useRef } from 'react';
import { Box, Paper } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { MessageInput } from '../MessageInput';
import { SendBtn } from '../SendBtn';
import { IconBtn } from '../IconBtn';
import { Contact } from '../Utils/mockData.ts';

interface ChatFooterProps {
    onSendMessage: (value: string) => void;
    contact: Contact;
}

export const ChatFooter = ({ onSendMessage, contact }:ChatFooterProps ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const input = inputRef.current?.value.trim();
        if (input) {
            onSendMessage(input);
            inputRef.current!.value = '';
            inputRef.current!.focus();
        }

    }

    return (
        <Box sx={{ px: 2, py: 1, background: '#f7f7fb' }}>
            <Paper
                elevation={1}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '24px',
                    px: 2,
                    py: 0.5,
                    backgroundColor: '#fff',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
                }}
            >
                <form onSubmit={onsubmit} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <IconBtn size='small' sx={{ color: '#868686' }}>
                        <EmojiEmotionsIcon />
                    </IconBtn>
                    <MessageInput
                        ref={inputRef}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                if (e.currentTarget.value.trim()) {
                                    onSendMessage(e.currentTarget.value.trim());
                                    e.currentTarget.value = '';
                                }
                            }
                        }}
                        placeholder={`Message ${contact.name}`}
                    />
                    <SendBtn type={'submit'} />
                </form>
            </Paper>
        </Box>
    );
};
