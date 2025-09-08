import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { ContactList } from '../../entities/ContactList';
import { Contact, mockItems } from '../../components/Utils/mockData.ts';

interface ChatListPanelProps {
    tab: string;
    contacts: Contact[];
    setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
    deletedIds: number[];
    setDeletedIds: React.Dispatch<React.SetStateAction<number[]>>;
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
                (item.status === 'online' || item.status.startsWith('last seen')) && !item.isArchived
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

export const ChatListPanel = ({ tab, contacts, setContacts, deletedIds, setDeletedIds }: ChatListPanelProps) => {
    const [searchText, setSearchText] = useState('');

    const navigate = useNavigate();

    const config = tabConfig[tab] ?? tabConfig['all'];

    const contactItemsForList = useMemo(() => {
        const lowerSearch = searchText.trim().toLowerCase();
        const isSearching = lowerSearch.length > 0;

        const baseFiltered = config.filter(
            contacts.filter(contact =>
                contact.name.toLowerCase().includes(lowerSearch) &&
                !deletedIds.includes(contact.id)
            )
        );

        const candidate = mockItems.find(
            contact =>
                contact.name.toLowerCase().includes(lowerSearch) &&
                !contacts.some(existing => existing.id === contact.id)
        );

        if (candidate && isSearching) {
            return [{ ...candidate, isPendingAddition: true }, ...baseFiltered];
        }

        return baseFiltered;
    }, [searchText, contacts, config, deletedIds]);

    const searchingText = (text: string) => {
        setSearchText(text);
    };

    const deleteContact = (id: number) => {
        setContacts(prev => prev.filter(item => item.id !== id));
        setDeletedIds(prev => [...prev, id]);
    };

    const archiveContact = (id: number) => {
        setContacts(prev =>
            prev.map(contact => contact.id === id ? { ...contact, isArchived: !contact.isArchived } : contact));
    };

    const addContact = () => {
        const pending = contactItemsForList.find((contact) => contact.isPendingAddition);
        if (pending) {
            setContacts((prev) => [
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
                onOpenChat={(id) => navigate(`/?tab=${tab}&chatId=${id}`)}
            />
        </Box>
    );
}
