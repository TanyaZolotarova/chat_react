import { Avatar, Box, Typography } from '@mui/material';
import { Message } from '../../features/ChatWindow';
import { Contact } from '../Utils/mockData.ts';

interface MessageBoxProps {
    message: Message;
    sender: Contact;
    direction: 'row' | 'row-reverse';
    color: string;

}

export const MessageBox: React.FC<MessageBoxProps> = ({ message, sender, direction, color }) => {
    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: direction,
                alignItems: 'flex-start',
                gap: 1,
                mb: 2,
                px: 2,
            }}
        >
            <Avatar src={sender.avatar} alt={sender.name} sx={{ width: 32, height: 32 }} />
            <Box
                sx={{
                    maxWidth: '70%',
                    bgcolor: color,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    boxShadow: 1,
                }}
            >
                <Typography fontSize={14}>{message.text}</Typography>
                <Typography fontSize={10} textAlign='right' color='gray' mt={0.5}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
            </Box>
        </Box>
    )
}
