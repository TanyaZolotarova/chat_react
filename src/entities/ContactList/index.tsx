import { useMemo, useState } from 'react';
import {
    Avatar,
    Box,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemButton,
    Paper,
    Typography,
    Menu,
    MenuItem, Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Contacts, mockItems } from '../../components/Utils/mockData.ts';

interface ContactListOptions {
    contactItems: Contacts[];
    placeholder: string;
    emptyText: string;
    filter: (items: Contacts[]) => Contacts[];
    showAddButton?: boolean;
    showSelection?: boolean;
    onDelete?: (id: number) => void;
}

export const ContactList = ({contactItems, placeholder, emptyText, filter, showSelection = true, onDelete}: ContactListOptions) => {
    const [selectedId, setSelectedId] = useState<number | null>(contactItems[0]?.id ?? null);
    const [searchContact, setSearchContact] = useState('');
    const [allContacts, setAllContacts] = useState<Contacts[]>(contactItems);

    const filteredContacts = useMemo(() =>
        filter(
            allContacts.filter(contact =>
                contact.name.toLowerCase().includes(searchContact.toLowerCase())
            )
        ), [searchContact, allContacts, filter]);

    const matchedFromMock = useMemo(() =>
        mockItems.find(
            contact =>
                contact.name.toLowerCase().includes(searchContact.toLowerCase()) &&
                !allContacts.some(ac => ac.id === contact.id)
        ), [searchContact, allContacts]);

    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [menuContactId, setMenuContactId] = useState<number | null>(null);
    const openMenu = Boolean(menuAnchorEl);

    const onClickMenu = (event: React.MouseEvent<HTMLButtonElement>, contactId: number) => {
        setMenuAnchorEl(event.currentTarget);
        setMenuContactId(contactId);
    };

    const closeMenu = () => {
        setMenuAnchorEl(null);
        setMenuContactId(null);
    };

    const onClickDelete = () => {
        if (menuContactId !== null) {
            onDelete?.(menuContactId);
            setAllContacts(prev => prev.filter(item => item.id !== menuContactId));
            if (selectedId === menuContactId) setSelectedId(null);
        }
        closeMenu();
    };

    const addArchive = () => {
        console.log(`Archive contact with id: ${menuContactId}`);
        closeMenu();
    };

    const addContactFromMock = () => {
        if (matchedFromMock) {
            const contact: Contacts = {
                ...matchedFromMock,
                status: matchedFromMock.status || 'online'
            };
            setAllContacts(prev => [...prev, contact]);
            setSearchContact('');
        }
    };

    const found = filteredContacts.length > 0;

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                p: 4,
                pb: 0,
                background: '#f7f7fb',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
            }}>
                <Paper sx={{
                    flex: 1, display: 'flex', alignItems: 'center',
                    borderRadius: '24px', px: 2, background: '#f7f7f8'
                }}>
                    <SearchIcon sx={{ color: '#868686' }} />
                    <InputBase
                        placeholder={placeholder}
                        value={searchContact}
                        onChange={e => setSearchContact(e.target.value)}
                        sx={{ ml: 1, flex: 1, fontSize: 16 }}
                    />
                </Paper>
            </Box>

            <List sx={{ flex: 1, overflowY: 'auto', pt: 1 }}>
                {!found && searchContact.trim() && matchedFromMock && (
                    <Box sx={{  mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, px: 4 }}>
                        <Box display='flex' justifyContent='center' alignItems='center' gap={1} mb={1}>
                            <Avatar src={matchedFromMock.avatar} alt={matchedFromMock.name} />
                            <Typography fontWeight={500}>{matchedFromMock.name}</Typography>
                        </Box>
                        <Button
                            onClick={addContactFromMock}
                            sx={{ bgcolor: '#2a2931', color: '#fff', '&:hover': { bgcolor: '#1e1e2f' } }}
                        >
                            <PersonAddIcon />
                        </Button>
                    </Box>
                )}

                {!found && searchContact.trim() && !matchedFromMock && (
                    <Typography sx={{ mt: 3, color: '#868686', textAlign: 'center' }}>
                        {emptyText}
                    </Typography>
                )}

                {filteredContacts.map(item => (
                    <ListItem
                        key={item.id}
                        disablePadding
                        secondaryAction={
                            <IconButton
                                edge='end'
                                onClick={e => {
                                    e.stopPropagation();
                                    onClickMenu(e, item.id);
                                }}
                            >
                                <MoreVertIcon sx={{ color: '#2a2931' }} />
                            </IconButton>
                        }
                        sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            px: 0,
                            bgcolor: 'transparent',
                            transition: 'background 0.15s',
                            '&:hover': { bgcolor: '#e6eefd' }
                        }}
                    >
                        <ListItemButton
                            selected={selectedId === item.id}
                            onClick={() => showSelection && setSelectedId(item.id)}
                            sx={{
                                borderRadius: 2,
                                cursor: 'pointer',
                                px: 2,
                                py: 1.3,
                                bgcolor: selectedId === item.id ? '#e6eefd' : 'transparent'
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    src={item.avatar}
                                    alt={item.name}
                                    onError={e => {
                                        const target = e.target;
                                        if (target && target instanceof HTMLImageElement) {
                                            target.src = '/default-avatar.png';
                                        }
                                    }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography fontWeight={500} fontSize={14}>{item.name}</Typography>}
                                secondary={
                                    <Typography fontSize={13} color={item.status === 'online' ? '#3fc86b' : '#868686'}>
                                        {item.status}
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Menu anchorEl={menuAnchorEl} open={openMenu} onClose={closeMenu}>
                <MenuItem onClick={onClickDelete}>Delete</MenuItem>
                <MenuItem onClick={addArchive}>Archiving</MenuItem>
            </Menu>
        </Box>
    );
};
