import { useMemo, useState } from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    Avatar,
    InputBase,
    Paper,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { IArchiveChats, mockArchive, mockContacts } from '../../components/Utils/mockData.ts';

export const ArchiveChats = () => {
    const [selectedId, setSelectedId] = useState<number | null>(mockContacts[0]?.id ?? null);
    const [search, setSearch] = useState('');
    const [chats, setChats] = useState<IArchiveChats[]>(mockArchive);

    const filteredArchiveChats = useMemo(() =>
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
                    <SearchIcon sx={{ color: '#868686' }} />
                    <InputBase
                        placeholder='Search archived chats'
                        sx={{ ml: 1, flex: 1, fontSize: 16 }}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </Paper>
            </Box>
            <List sx={{ flex: 1, overflowY: 'auto', pt: 1 }}>
                {filteredArchiveChats.length === 0 && (
                    <Typography sx={{ mt: 3, color: '#868686', textAlign: 'center' }}>
                        No archived chats found
                    </Typography>
                )}
                {filteredArchiveChats.map(chat => (
                    <ListItem
                        key={chat.id}
                        sx={{
                            borderRadius: 2,
                            cursor: 'pointer',
                            px: 2,
                            py: 1.3,
                            bgcolor: 'transparent',
                            '&:hover': {bgcolor: '#e6eefd'},
                            transition: 'background 0.15s'
                        }}
                        secondaryAction={
                            <IconButton edge='end' aria-label='delete' onClick={() => handleDelete(chat.id)}>
                                <DeleteIcon sx={{ color: '#2a2931' }} />
                            </IconButton>
                        }
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
                                <Typography fontSize={13} color='#868686'>
                                    {chat.status}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
