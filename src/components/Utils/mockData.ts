export interface MockData {
    id: number;
    name: string;
    status: string;
    avatar: string;
}

export const mockData: MockData[] = [
    { id: 1, name: 'Sansa Stark', status: 'online', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: 2, name: 'Arya Stark', status: 'last seen just now', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 4, name: 'Bran Stark', status: 'online', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 5, name: 'Rickon Stark', status: 'online', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: 6, name: 'Robb Stark', status: 'last seen just now', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 7, name: 'Jon Snow', status: 'online', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { id: 8, name: 'TRUHA', status: 'No unread', avatar: 'https://randomuser.me/api/portraits/men/13.jpg' },
    { id: 9, name: 'family', status: '2 messages', avatar: 'https://randomuser.me/api/portraits/women/15.jpg' },
    { id: 10, name: 'Test chat', status: 'Archived', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
];
