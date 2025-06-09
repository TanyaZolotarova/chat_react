import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Container } from '@mui/material';
import { SideBar } from '../../features/SideBar';
import { ProfileModal } from '../../features/ProfileModal';

export const ChatList = () => {
    const [searchParams] = useSearchParams();
    const [isProfileOpen , setIsProfileOpen ] = useState(false);
    const tab = searchParams.get('tab') || 'default';
    const tabs: Record<string, JSX.Element> = {
        'archive': <div>Archive chats</div>,
        'contacts': <div>Contacts</div>,
        'default': <div>All chats</div>,
    };

    return(
        <Container style={{ display: 'flex' }}>
            <div>
                {tabs[tab]}
            </div>
            <SideBar onProfileClick={() => setIsProfileOpen(true)}/>
            <ProfileModal
                open={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
            />
            <main>
                <h1>Chat</h1>
            </main>
        </Container>
    )
}
