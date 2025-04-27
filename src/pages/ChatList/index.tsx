import { useSearchParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { SideBar } from '../../features/SideBar';

export const ChatList = () => {

    const [searchParams] = useSearchParams();
    const tab = searchParams.get('tab');

    return(
        <Container style={{ display: 'flex' }}>
            <div>
                {tab === 'archive' && <div>Archive chats</div>}
                {tab === 'contacts' && <div>Contacts</div>}
                {!tab && <div>All chats</div>}
            </div>
            <SideBar />
            <main>
                <h1>Chat</h1>
            </main>
        </Container>
    )
}
