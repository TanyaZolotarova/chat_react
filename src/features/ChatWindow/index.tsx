import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { ChatHeader } from '../../entities/ChatHeader';
import { ChatFooter } from '../../entities/ChatFooter';
import { MessageBox } from '../../entities/MessageBox';
import { selectUser } from '../../entities/user/userSlice.ts';
import { generateEmailId } from '../../components/Utils';
import { Contact, Message, mockMessages } from '../../components/Utils/mockData';

interface ChatWindowProps {
    contacts: Contact[];
}

export const ChatWindow = ({ contacts }: ChatWindowProps) => {
    const [searchParams] = useSearchParams();
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [inputValue, setInputValue] = useState('');

    const user = useSelector(selectUser);
    const currentUserId = user.email ? generateEmailId(user.email) : 0;
    const chatIdParam = searchParams.get('chatId');
    const chatId = chatIdParam && !isNaN(Number(chatIdParam)) && chatIdParam.trim() !== '' ? Number(chatIdParam) : null;

    const contact = chatId ? contacts.find(contact => contact.id === chatId) : undefined;

    const messagesUsers = contact ? messages.filter(msg => {
        const isForThisChat = msg.contactId === contact.id;
        const isSentByCurrentOrContact = msg.senderId === currentUserId || msg.senderId === contact.id;
        return isForThisChat && isSentByCurrentOrContact;
    }) : [];

    const SendMessage = () => {
        const text = inputValue.trim();
        if (!text.trim() || !contact){
            console.warn('Message is empty or contact not found');
            return;
        }

        const newMessage: Message = {
            id: Date.now(),
            text,
            contactId: contact.id,
            senderId: currentUserId,
            timestamp: new Date().toISOString(),
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue('');
    };

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
                        <Box sx={{ flex: 1, overflowY: 'auto', px: 1, pt: 2 }}>
                            {messagesUsers.map(msg => {
                                const sender = msg.senderId === currentUserId ? {
                                    id: currentUserId,
                                    name: user.name ?? 'You',
                                    avatar: user.avatar ?? '',
                                    status: 'online',
                                } : contacts.find(c => c.id === msg.senderId);

                                if (!sender) return null;

                                const isOwn = msg.senderId === currentUserId;
                                return (
                                    <MessageBox
                                        key={msg.id}
                                        message={msg}
                                        sender={sender}
                                        isOwn={isOwn}
                                    />
                                );
                            })}
                        </Box>
                        <ChatFooter onSendMessage={SendMessage} inputValue={inputValue} onChange={setInputValue}/>
                    </>
                ) : (
                    <Box sx={{ padding: 2, textAlign: 'center', color: 'gray' }}>Chat not found</Box>
                )}
            </Box>
    )
}
