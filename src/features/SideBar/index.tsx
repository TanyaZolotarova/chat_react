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
import './style.css';

interface MenuItem {
    action?: string;
    link?: string;
    badge?: number;
    icon: React.ReactNode;
    text: string;
}

const menuItems = [
    { text: 'Profile', icon: <Person />, link: '/profile' },
    { text: 'All chats', icon: <Home />, link: '/chats', badge: 0 },
    { text: 'Archive chats', icon: <Archive />, link: '/chats?tab=archive', badge: 0 },
    { text: 'Contacts', icon: <Group />, link: '/chats?tab=contacts' },
    { text: 'Log out', icon: <Logout />, action: 'logout' },
];

export const SideBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleItemClick = (item: MenuItem) => {
        if (item.action === 'logout') {
            dispatch(logout());
            navigate('/');
        } else if (item.link) {
            navigate(item.link);
        }
    };

    return(
        <Drawer variant='permanent' className='sidebar'>
            <Box className='wrapper'>
                <Avatar alt='User Avatar' src='' className='avatar'/>
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem key={index} disablePadding sx={{ justifyContent: 'center', marginY: 1 }}>
                            <ListItemButton sx={{ display: 'flex', flexDirection: 'column', color: '#fff' }} onClick={() => handleItemClick(item)}>
                                <ListItemIcon sx={{ color: '#fff', minWidth: 'auto' }}>
                                    {item.badge ? (
                                        <Badge badgeContent={item.badge} color="error" overlap='circular'>
                                            {item.icon}
                                        </Badge>
                                    ) : (
                                        item.icon
                                    )}
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
