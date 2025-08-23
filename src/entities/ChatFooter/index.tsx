import { useState } from 'react';
import { Box, IconButton, Paper } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { MessageTextInput } from '../../components/MessageInput';
import { SendIconBtn } from '../../components/SendIconBtn';

export const ChatFooter = () => {
    const [text, setText] = useState('');

    const sendMessage = () => {
        if (!text.trim()) return;
        console.log('Sent:', text);
        setText('');
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
                <IconButton size='small' sx={{ color: '#868686' }}>
                    <EmojiEmotionsIcon />
                </IconButton>
                <MessageTextInput
                    value={text}
                    onChange={setText}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') sendMessage();
                    }}
                />
                <SendIconBtn onClick={sendMessage} disabled={!text.trim()} />
            </Paper>
        </Box>
    );
};
