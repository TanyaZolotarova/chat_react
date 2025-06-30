import { useState } from 'react';
import { Box } from '@mui/material';
import { ItemTab } from './ItemTab';
import { Contacts, mockItems } from '../../components/Utils/mockData.ts';

interface TabsProps {
    tab: string;
}

const tabConfig: Record<string, {
    placeholder: string;
    emptyText: string;
    showAddButton?: boolean;
    filter: (data: Contacts[]) => Contacts[];
    onDelete?: (id: number) => void;
}> = {
    contacts: {
        placeholder: 'Search contacts',
        emptyText: 'No contacts found',
        showAddButton: true,
        filter: (data) =>
            data.filter(item =>
                item.status === 'online' || item.status.startsWith('last seen')
            ),
    },
    archive: {
        placeholder: 'Search archived chats',
        emptyText: 'No archived chats found',
        filter: (data) =>
            data.filter(item => item.status.toLowerCase() === 'archived'),
    },
    all: {
        placeholder: 'Search chats',
        emptyText: 'No chats found',
        filter: (data) =>
            data.filter(item => item.status.toLowerCase() !== 'archived'),
    },
};

export const ChatListPanel = ({ tab }: TabsProps) => {
    const [allItems, setAllItems] = useState<Contacts[]>(mockItems);

    const config = tabConfig[tab] ?? tabConfig['all'];
    const filteredData = config.filter(allItems);

    return (
        <Box
            sx={{
                width: 400,
                minHeight: '100vh',
                background: '#f7f7fb',
                marginLeft: '80px',
                borderRight: '1px solid #e5e5ef',
                boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.3)',
                boxSizing: 'border-box',
                p: 0,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <ItemTab
                data={filteredData}
                placeholder={config.placeholder}
                emptyText={config.emptyText}
                showAddButton={config.showAddButton}
                onDelete={(id) => setAllItems(prev => prev.filter(item => item.id !== id))}
            />
        </Box>
    );
}
