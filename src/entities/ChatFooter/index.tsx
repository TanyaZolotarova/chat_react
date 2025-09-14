import { Box, Paper } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { MessageInput } from '../../components/MessageInput';
import { SendBtn } from '../../components/SendBtn';
import { IconBtn } from '../../components/IconBtn';

interface ChatFooterProps {
    inputValue: string;
    onChange: (value: string) => void;
    onSendMessage: () => void;
}

export const ChatFooter = ({ onSendMessage, onChange, inputValue }:ChatFooterProps ) => {

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
                    value={inputValue}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            onSendMessage();
                        }
                    }}
                />
                <SendBtn onClick={onSendMessage} disabled={!inputValue.trim()}/>
            </Paper>
        </Box>
    );
};
