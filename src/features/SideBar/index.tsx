import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Avatar,
    Badge,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import { Archive, Group, Home, Logout,  Person } from '@mui/icons-material';
import { logout } from '../../entities/auth/authSlice.ts'
import { generateId } from '../../components/Utils';
import './style.css';

interface MenuItem {
    id: number;
    text: string;
    icon: React.ReactNode;
    action?: string;
    link?: string;
    badge?: number;
}

const menuItems: MenuItem[] = [
    { text: 'Profile', icon: <Person />, action: 'profile', id: generateId() },
    { text: 'All chats', icon: <Home />, link: '/chats', badge: 0, id: generateId() },
    { text: 'Archive chats', icon: <Archive />, link: '/chats?tab=archive', badge: 0, id: generateId() },
    { text: 'Contacts', icon: <Group />, link: '/chats?tab=contacts', id: generateId() },
    { text: 'Log out', icon: <Logout />, action: 'logout', id: generateId() },
];

export const SideBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleItemClick = (item: MenuItem) => {
        const actions: Record<string, () => void> = {
            logout: () => {
                dispatch(logout());
                navigate('/');
            },
            profile: () => {
                navigate('/profile');
            },
        };

        if (item.action && actions[item.action]) {
            actions[item.action]();
        } else if (item.link) {
            navigate(item.link);
        }
    };

    return(
        <Drawer variant='permanent' className='sidebar'>
            <Box className='wrapper'>
                <Avatar alt='User Avatar' src='' className='avatar'/>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.id} sx={{ justifyContent: 'center', marginY: 1 }} disablePadding>
                            <ListItemButton sx={{ display: 'flex', flexDirection: 'column', color: '#fff' }} onClick={() => handleItemClick(item)}>
                                <ListItemIcon sx={{ color: '#fff', minWidth: 'auto' }}>
                                    <Badge color='error' overlap='circular'>
                                            {item.icon}
                                        </Badge>
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: '10px',
                                        textAlign: 'center',
                                        marginTop: '4px',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}
