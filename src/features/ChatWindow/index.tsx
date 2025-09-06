import { Box } from '@mui/material';
import { ChatHeader } from '../../entities/ChatHeader';
import { useSearchParams } from 'react-router-dom';
import { ChatFooter } from '../../entities/ChatFooter';
import { Contact  } from '../../components/Utils/mockData';

interface ChatWindowProps {
    contacts: Contact[];
}

export const ChatWindow = ({ contacts }: ChatWindowProps) => {
    const [searchParams] = useSearchParams();
    const chatIdParam = searchParams.get('chatId');
    const chatId = chatIdParam && !isNaN(Number(chatIdParam)) ? Number(chatIdParam) : null;

    const contact = chatId ? contacts.find(contact => contact.id === chatId) : undefined;

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
                {contact ? (
                    <>
                        <ChatHeader
                            name={contact.name}
                            status={contact.isArchived ? 'Archived' : contact.status}
                            avatar={contact.avatar}
                        />
                        <Box sx={{ flex: 1, overflowY: 'auto' }}></Box>
                        <ChatFooter />
                    </>
                ) : (
                    <Box sx={{ padding: 2, textAlign: 'center', color: 'gray' }}>Chat not found</Box>
                )}
            </Box>
    )
}
