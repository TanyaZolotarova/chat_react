import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Box } from '@mui/material';
import { SideBar } from '../../features/SideBar';
import { ProfileModal } from '../../features/ProfileModal';
import { ChatListPanel } from '../../features/ChatListPanel';
import { ChatWindow } from '../../features/ChatWindow';
import { mockItems, Contact } from '../../components/Utils/mockData';

export const ChatList = () => {
    const [searchParams] = useSearchParams();
    const [isProfileOpen , setIsProfileOpen ] = useState(false);
    const [contacts, setContacts] = useState<Contact[]>(mockItems);
    const [deletedIds, setDeletedIds] = useState<number[]>([]);

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
                <ChatListPanel
                    tab={tab}
                    contacts={contacts}
                    setContacts={setContacts}
                    deletedIds={deletedIds}
                    setDeletedIds={setDeletedIds}
                />
            </Box>
            <ProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
            />
            <Box component='main' sx={{flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100vh'}}>
                <ChatWindow contacts={contacts}/>
            </Box>
        </Box>
    )
}
