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
    Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Contacts } from '../../../components/Utils/mockData.ts';

interface ContactListOptions {
    contactItems: Contacts[];
    placeholder: string;
    emptyText: string;
    showAddButton?: boolean;
    showSelection?: boolean;
    onDelete?: (id: number) => void;
}

export const ContactList = ({ contactItems, placeholder, emptyText, showAddButton = false, showSelection = true, onDelete }: ContactListOptions) => {
    const [selectedId, setSelectedId] = useState<number | null>(contactItems[0]?.id ?? null);
    const [searchContact, setSearchContact] = useState('');

    const filteredContacts = useMemo(() =>
        contactItems.filter(contact => contact.name.toLowerCase().includes(searchContact.toLowerCase())), [searchContact, contactItems]);

    const onClickDelete = (id: number) => {
        onDelete?.(id);
        if (selectedId === id) setSelectedId(null);
    };

    return(
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
                {showAddButton && (
                    <IconButton sx={{
                        ml: 1, bgcolor: '#2a2931', color: '#fff',
                        '&:hover': { bgcolor: '#1e1e2f' }
                    }}>
                        <PersonAddIcon />
                    </IconButton>
                )}
            </Box>

            <List sx={{ flex: 1, overflowY: 'auto', pt: 1 }}>
                {filteredContacts.length === 0 && (
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
                                    onClickDelete(item.id);
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
        </Box>
    );
}
