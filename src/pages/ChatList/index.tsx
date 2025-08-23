import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Box } from '@mui/material';
import { SideBar } from '../../features/SideBar';
import { ProfileModal } from '../../features/ProfileModal';
import { ChatListPanel } from '../../features/ChatListPanel';
import { ChatWindow } from '../../features/ChatWindow';

export const ChatList = () => {
    const [searchParams] = useSearchParams();
    const [isProfileOpen , setIsProfileOpen ] = useState(false);
    const tab = searchParams.get('tab') || 'all';

    return(
        <Box style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
            <SideBar tab={tab} onProfileClick={() => setIsProfileOpen(true)}/>
            <Box sx={{
                height: '100vh',
                overflowY: 'auto',
                boxShadow: '5px 0 8px -2px rgba(0,0,0,0.3)',
                zIndex: 1100,
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none',
                }}}>
                <ChatListPanel tab={tab} />
            </Box>
            <ProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
            />
            <Box component='main' sx={{flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100vh'}}>
                <ChatWindow />
            </Box>
        </Box>
    )
}
