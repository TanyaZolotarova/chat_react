import { useMemo, useState } from 'react';
import {
    Box,
    List,
    ListItemAvatar,
    ListItemText,
    Avatar,
    InputBase,
    Paper,
    Typography,
    ListItemButton,
    IconButton,
    ListItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { IChat, mockChats, mockContacts } from '../../components/Utils/mockData.ts';

export const AllChats = () => {
    const [selectedId, setSelectedId] = useState<number | null>(mockContacts[0]?.id ?? null);
    const [search, setSearch] = useState('');
    const [chats, setChats] = useState<IChat[]>(mockChats);

    const filteredAllChats = useMemo(() =>
        chats.filter(chat => chat.name.toLowerCase().includes(search.toLowerCase())), [search, chats]);

    const handleDelete = (id: number) => {
        setChats(prev => prev.filter(chat => chat.id !== id));
        if (selectedId === id) setSelectedId(null);
    };

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 4, pb: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Paper sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '24px',
                    px: 2,
                    background: '#f7f7f8'
                }}>
                    <SearchIcon sx={{ color: '#868686' }}/>
                    <InputBase
                        placeholder='Search chats'
                        sx={{ ml: 1, flex: 1, fontSize: 16 }}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </Paper>
            </Box>
            <List sx={{flex: 1, overflowY: 'auto', pt: 1}}>
                {filteredAllChats.length === 0 && (
                    <Typography sx={{ mt: 3, color: '#868686', textAlign: 'center' }}>
                        No chats found
                    </Typography>
                )}
                {filteredAllChats.map(chat => (
                    <ListItem
                        key={chat.id}
                        disablePadding
                        secondaryAction={
                            <IconButton
                                edge='end'
                                aria-label='delete'
                                onClick={e => {
                                    e.stopPropagation();
                                    handleDelete(chat.id);
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
                            '&:hover': {bgcolor: '#e6eefd'}
                        }}
                    >
                        <ListItemButton
                            selected={selectedId === chat.id}
                            onClick={() => setSelectedId(chat.id)}
                            sx={{
                                borderRadius: 2,
                                cursor: 'pointer',
                                px: 2,
                                py: 1.3,
                                bgcolor: selectedId === chat.id ? '#e6eefd' : 'transparent'
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    src={chat.avatar}
                                    alt={chat.name}
                                    onError={e => {
                                        const target = e.target;
                                        if (target && target instanceof HTMLImageElement) {
                                            target.src = '/default-avatar.png';
                                        }
                                    }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography fontWeight={500} fontSize={14}>{chat.name}</Typography>}
                                secondary={
                                    <Typography fontSize={13} color={chat.status === 'online' ? '#3fc86b' : '#868686'}>
                                        {chat.status}
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
