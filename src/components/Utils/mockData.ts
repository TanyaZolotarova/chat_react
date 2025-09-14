export interface Contact {
    id: number;
    name: string;
    status: string;
    avatar: string;
    isPendingAddition?: boolean;
    isArchived?: boolean;
}

export interface Message {
    contactId: number;
    id: number;
    senderId: number;
    text: string;
    timestamp: string;
}

export const mockItems: Contact[] = [
    { id: 1, name: 'Sansa Stark', status: 'online', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', isArchived: false },
    { id: 2, name: 'Arya Stark', status: 'last seen just now', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', isArchived: false },
    { id: 3, name: 'Cersei Lannister', status: 'No unread', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', isArchived: false },
    { id: 4, name: 'Bran Stark', status: 'online', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', isArchived: false },
    { id: 5, name: 'Rickon Stark', status: 'online', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', isArchived: false },
    { id: 6, name: 'Robb Stark', status: 'last seen just now', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', isArchived: false },
    { id: 7, name: 'Jon Snow', status: 'online', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', isArchived: false },
    { id: 8, name: 'TRUHA', status: 'No unread', avatar: 'https://randomuser.me/api/portraits/men/13.jpg', isArchived: false },
    { id: 9, name: 'family', status: '2 messages', avatar: 'https://randomuser.me/api/portraits/women/15.jpg', isArchived: false },
    { id: 10, name: 'Test chat', status: 'Archived', avatar: 'https://randomuser.me/api/portraits/men/6.jpg', isArchived: true },
];

export const mockMessages: Message[] = [
    { contactId: 1, id:1, senderId:1, text: 'Привет! Как дела?', timestamp: '2025-07-02T08:00:00Z' },
    { contactId: 2, id:2, senderId:2, text: 'У тебя есть минутка поговорить?', timestamp: '2025-07-02T08:02:10Z' },
    { contactId: 3, id:3, senderId:3, text: 'Документы уже отправлены.', timestamp: '2025-07-02T08:05:23Z' },
    { contactId: 1, id:4, senderId:4, text: 'Все хорошо, спасибо! А ты как?', timestamp: '2025-07-02T08:07:12Z' },
    { contactId: 4, id:5, senderId:5, text: 'Давай встретимся в 7?', timestamp: '2025-07-02T08:10:00Z' },
    { contactId: 2, id:6, senderId:1, text: 'Да, конечно. В чем дело?', timestamp: '2025-07-02T08:12:45Z' },
    { contactId: 5, id:7, senderId:2, text: 'Не забудь принести ноутбук.', timestamp: '2025-07-02T08:15:32Z' },
    { contactId: 3, id:8, senderId:3, text: 'Жду подтверждение от клиента.', timestamp: '2025-07-02T08:20:11Z' },
    { contactId: 4, id:9, senderId:4, text: 'Встречаемся у входа?', timestamp: '2025-07-02T08:23:55Z' },
    { contactId: 5, id:10, senderId:5, text: 'Да, на том же месте.', timestamp: '2025-07-02T08:26:17Z' },
    { contactId: 1, id:11, senderId:1, text: 'Увидимся позже!', timestamp: '2025-07-02T08:30:00Z' },
    { contactId: 2, id:12, senderId:2, text: 'Не забудь про звонок в 11.', timestamp: '2025-07-02T08:33:40Z' },
    { contactId: 3, id:13, senderId:3, text: 'Клиент одобрил договор.', timestamp: '2025-07-02T08:36:05Z' },
    { contactId: 4, id:14, senderId:4, text: 'Отлично! Работаем дальше.', timestamp: '2025-07-02T08:39:20Z' },
    { contactId: 5, id:15, senderId:5, text: 'Я задержусь на 10 минут.', timestamp: '2025-07-02T08:42:01Z' },
    { contactId: 1, id:16, senderId:1, text: 'Хорошо, подожду тебя.', timestamp: '2025-07-02T08:45:15Z' },
    { contactId: 2, id:17, senderId:2, text: 'Куда отправить файл?', timestamp: '2025-07-02T08:47:33Z' },
    { contactId: 3, id:18, senderId:3, text: 'На почту, как обычно.', timestamp: '2025-07-02T08:49:50Z' },
    { contactId: 4, id:19, senderId:4, text: 'Спасибо, все получил.', timestamp: '2025-07-02T08:52:10Z' },
    { contactId: 5, id:20, senderId:5, text: 'До встречи!', timestamp: '2025-07-02T08:55:00Z' }
];
