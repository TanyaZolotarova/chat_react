import { Box, Paper } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { MessageInput } from '../MessageInput';
import { SendBtn } from '../SendBtn';
import { IconBtn } from '../IconBtn';
import { Contact } from '../Utils/mockData.ts';

interface ChatFooterProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSendMessage: () => void;
    contact: Contact;
}

export const ChatFooter = ({ onSendMessage, value , onChange, contact }:ChatFooterProps ) => {

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
                <IconBtn size='small' sx={{ color: '#868686' }}>
                    <EmojiEmotionsIcon />
                </IconBtn>
                <MessageInput
                    value={value}
                    onChange={onChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            onSendMessage();
                        }
                    }}
                    placeholder={`Message ${contact.name}`}
                />
                <SendBtn onClick={onSendMessage} disabled={!value.trim()}/>
            </Paper>
        </Box>
    );
};
