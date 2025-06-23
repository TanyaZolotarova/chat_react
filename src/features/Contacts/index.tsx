import { useMemo, useState } from 'react';
import {
    Box,
    Avatar,
    Typography,
    InputBase,
    IconButton,
    Paper,
    List,
    ListItemAvatar,
    ListItemText,
    ListItem, ListItemButton
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete';
import { IContact, mockContacts } from '../../components/Utils/mockData.ts';

export const Contacts = () => {
    const [selectedId, setSelectedId] = useState<number | null>(mockContacts[0]?.id ?? null);
    const [search, setSearch] = useState('');
    const [contacts, setContacts] = useState<IContact[]>(mockContacts);

    const filteredContacts = useMemo(() =>
        contacts.filter(contact => contact.name.toLowerCase().includes(search.toLowerCase())), [search, contacts]);

    const handleDelete = (id: number) => {
        setContacts(prev => prev.filter(contact => contact.id !== id));
        if (selectedId === id) {
            setSelectedId(null);
        }
    };

    return(
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 4, pb: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Paper sx={{ flex: 1, display: 'flex', alignItems: 'center', borderRadius: '24px', px: 2, background: '#f7f7f8' }}>
                    <SearchIcon sx={{ color: '#868686' }} />
                    <InputBase
                        aria-label='Search contacts'
                        placeholder='Search contacts'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        sx={{ ml: 1, flex: 1, fontSize: 16 }}
                    />
                </Paper>
                <IconButton sx={{ ml: 1, bgcolor: '#2a2931', color: '#fff', '&:hover': { bgcolor: '#1e1e2f' }
                }}>
                    <PersonAddIcon />
                </IconButton>
            </Box>
            <List sx={{ flex: 1, overflowY: 'auto', pt: 1 }}>
                {filteredContacts.length === 0 && (
                    <Typography sx={{ mt: 3, color: '#868686', textAlign: 'center' }}>
                        No contacts found
                    </Typography>
                )}
                {filteredContacts.map((contact) => (
                    <ListItem
                        key={contact.id}
                        disablePadding
                        secondaryAction={
                            <IconButton
                                edge='end'
                                aria-label='delete'
                                onClick={e => {
                                    e.stopPropagation();
                                    handleDelete(contact.id);
                                }}
                            >
                                <DeleteIcon sx={{ color: '#2a2931' }} />
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
                            selected={selectedId === contact.id}
                            onClick={() => setSelectedId(contact.id)}
                            sx={{
                                borderRadius: 2,
                                cursor: 'pointer',
                                px: 2,
                                py: 1.3,
                                bgcolor: selectedId === contact.id ? '#e6eefd' : 'transparent'
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    src={contact.avatar}
                                    alt={contact.name}
                                    onError={e => {
                                        const target = e.target;
                                        if (target && target instanceof HTMLImageElement) {
                                            target.src = '/path/to/default/avatar.png';
                                        }
                                    }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography fontWeight={500} fontSize={14}>{contact.name}</Typography>}
                                secondary={
                                    <Typography fontSize={13} color={contact.status === 'online' ? '#3fc86b' : '#868686'}>
                                        {contact.status}
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}
