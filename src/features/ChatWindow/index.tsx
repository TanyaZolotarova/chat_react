import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { ChatHeader } from '../../components/ChatHeader';
import { ChatFooter } from '../../components/ChatFooter';
import { MessageBox } from '../../components/MessageBox';
import { selectUser } from '../../entities/user/userSlice.ts';
import { Contact } from '../../components/Utils/mockData';

interface ChatWindowProps {
    contacts: Contact[];
}

export interface Message {
    id: number;
    text: string;
    senderId: string | number;
    timestamp: string;
}

export const ChatWindow = ({ contacts }: ChatWindowProps) => {
    const [searchParams] = useSearchParams();
    const [messages, setMessages] = useState<Message[]>([]);

    const user = useSelector(selectUser);
    const currentUserId = user.email ?? 0;
    const chatIdParam = searchParams.get('chatId');
    const chatId = chatIdParam && !isNaN(Number(chatIdParam)) && chatIdParam.trim() !== '' ? Number(chatIdParam) : null;

    const contact = chatId ? contacts.find(contact => contact.id === chatId) : undefined;

    useEffect(() => {
        setMessages([]);
    }, [chatId]);

    const onMessageSend = (value:string) => {
        const text = value.trim();
        if (!text.trim() || !contact){
            console.warn('Message is empty or contact not found');
            return;
        }

        const newMessage = {
            id: Date.now(),
            text,
            senderId: currentUserId,
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, newMessage]);
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
                            {messages?.map(msg => {
                                const sender = msg.senderId === currentUserId ? {
                                    id: currentUserId,
                                    name: user.name ?? 'You',
                                    avatar: user.avatar ?? '',
                                    status: 'online',
                                } : contacts.find(c => c.id === msg.senderId);

                                if (!sender) return null;

                                const direction = msg.senderId === currentUserId ? 'row-reverse' : 'row';
                                const color = msg.senderId === currentUserId ? '#daf8cb' : '#fff';
                                return (
                                    <MessageBox
                                        key={msg.id}
                                        message={msg}
                                        sender={sender}
                                        direction={direction}
                                        color={color}
                                    />
                                );
                            })}
                        </Box>
                        <ChatFooter onSendMessage={onMessageSend} contact={contact}/>
                    </>
                ) : (
                    <Box sx={{ padding: 2, textAlign: 'center', color: 'gray' }}>Chat not found</Box>
                )}
            </Box>
    )
}
