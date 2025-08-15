import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { ContactList } from '../../entities/ContactList';
import { Contact, mockItems } from '../../components/Utils/mockData.ts';

interface ChatListPanelProps {
    tab: string;
}

const tabConfig: Record<string, {
    placeholder: string;
    emptyText: string;
    showAddButton?: boolean;
    filter: (data: Contact[]) => Contact[];
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
        filter: (data) => data.filter(item => item.isArchived),
    },
    all: {
        placeholder: 'Search chats',
        emptyText: 'No chats found',
        filter: (data) => data.filter(item => !item.isArchived),
    },
};

export const ChatListPanel = ({ tab }: ChatListPanelProps) => {
    const [allContacts, setAllContacts] = useState<Contact[]>(mockItems);
    const [searchText, setSearchText] = useState('');
    const [deletedIds, setDeletedIds] = useState<number[]>([]);

    const config = tabConfig[tab] ?? tabConfig['all'];

    const contactItemsForList = useMemo(() => {
        const lowerSearch = searchText.trim().toLowerCase();
        const isSearching = lowerSearch.length > 0;

        const baseFiltered = config.filter(
            allContacts.filter(contact =>
                contact.name.toLowerCase().includes(lowerSearch) &&
                !deletedIds.includes(contact.id)
            )
        );

        const candidate = mockItems.find(
            contact =>
                contact.name.toLowerCase().includes(lowerSearch) &&
                !allContacts.some(ac => ac.id === contact.id)
        );

        if (candidate && isSearching) {
            return [{ ...candidate, isPendingAddition: true }, ...baseFiltered];
        }

        return baseFiltered;
    }, [searchText, allContacts, config, deletedIds]);

    const searchingText = (text: string) => {
        setSearchText(text);
    };

    const deleteContact = (id: number) => {
        setAllContacts(prev => prev.filter(item => item.id !== id));
        setDeletedIds(prev => [...prev, id]);
    };

    const archiveContact = (id: number) => {
        setAllContacts(prev =>
            prev.map(contact => contact.id === id ? { ...contact, isArchived: true, status: 'Archived' } : contact));
    };

    const addContact = () => {
        const pending = contactItemsForList.find((contact) => contact.isPendingAddition);
        if (pending) {
            setAllContacts((prev) => [
                ...prev,
                { ...pending, isPendingAddition: undefined },
            ]);
            setDeletedIds(prev => prev.filter(id => id !== pending.id));
            setSearchText('');
        }
    };

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
            <ContactList
                contactItems={contactItemsForList}
                placeholder={config.placeholder}
                emptyText={config.emptyText}
                showAddButton={config.showAddButton}
                searchText={searchText}
                onSearch={searchingText}
                onAddContact={addContact}
                onDelete={deleteContact}
                onArchive={archiveContact}
            />
        </Box>
    );
}
