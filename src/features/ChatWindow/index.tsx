import { Box } from '@mui/material';
import { ChatHeader } from '../../entities/ChatHeader';
import { ChatFooter } from '../../entities/ChatFooter';

export const ChatWindow = () => {
    return(
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    flex: 1,
                    minWidth: 0,
                    background: '#f7f7fb',
                }}
            >
                {/* TODO: delete mock data */}
                <ChatHeader name='Sansa Stark' status='online' avatar='https://randomuser.me/api/portraits/women/3.jpg' />
                <Box sx={{ flex: 1, overflowY: 'auto', background: '#f7f7fb' }}></Box>
                <ChatFooter />
            </Box>
    )
}
