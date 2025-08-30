import { Box, Paper } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { MessageInput } from '../../components/MessageInput';
import { SendBtn } from '../../components/SendBtn';
import { IconBtn } from '../../components/IconBtn';

export const ChatFooter = () => {
    const sendMessage = () => {
        const input = document.querySelector<HTMLInputElement>('input[placeholder="Message"]');
        if (!input) return;

        const value = input.value.trim();
        if (!value) return;

        console.log('Sent:', value);
        input.value = '';
    };

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
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                />
                <SendBtn onClick={sendMessage}/>
            </Paper>
        </Box>
    );
};
