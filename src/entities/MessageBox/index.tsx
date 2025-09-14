import { Avatar, Box, Typography } from '@mui/material';
import { Contact, Message } from '../../components/Utils/mockData.ts';

interface MessageBoxProps {
    message: Message;
    sender: Contact;
    isOwn: boolean;
}

export const MessageBox: React.FC<MessageBoxProps> = ({ message, sender, isOwn }) => {
    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: isOwn ? 'row-reverse' : 'row',
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
                    bgcolor: isOwn ? '#daf8cb' : '#fff',
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
