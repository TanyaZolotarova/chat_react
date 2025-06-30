import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { SideBar } from '../../features/SideBar';
import { ProfileModal } from '../../features/ProfileModal';
import { ChatListPanel } from '../../features/ChatListPanel';
import { Box } from '@mui/material';

export const ChatList = () => {
    const [searchParams] = useSearchParams();
    const [isProfileOpen , setIsProfileOpen ] = useState(false);
    const tab = searchParams.get('tab') || 'default';

    return(
        <Box style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
            <SideBar onProfileClick={() => setIsProfileOpen(true)}/>
            <ChatListPanel tab={tab} />
            <ProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
            />
            <main style={{ flex: 1, minWidth: 0 }}>
                <h1>Chat</h1>
            </main>
        </Box>
    )
}
