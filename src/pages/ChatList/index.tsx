import { useSearchParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { SideBar } from '../../features/SideBar';

export const ChatList = () => {
    const [searchParams] = useSearchParams();
    const tab = searchParams.get('tab') || 'default';
    const tabs: Record<string, JSX.Element> = {
        'archive': <div>Archive chats</div>,
        'contacts': <div>Contacts</div>,
        'default': <div>All chats</div>
    };

    return(
        <Container style={{ display: 'flex' }}>
            <div>
                {tabs[tab]}
            </div>
            <SideBar />
            <main>
                <h1>Chat</h1>
            </main>
        </Container>
    )
}
