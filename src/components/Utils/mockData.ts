export interface Contact {
    id: number;
    name: string;
    status: string;
    avatar: string;
    isPendingAddition?: boolean;
    isArchived?: boolean;
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
