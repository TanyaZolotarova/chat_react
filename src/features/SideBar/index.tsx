import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { Archive, Group, Home, Logout, Person } from '@mui/icons-material';
import { logout } from '../../entities/auth/authSlice.ts'
import { clearUserData, selectUserAvatar } from '../../entities/user/userSlice';
import { getIdGenerator } from '../../components/Utils';
import './style.css';

interface MenuItem {
    id: number;
    text: string;
    icon: React.ReactNode;
    onClick: () => void;
    action?: string;
    link?: string;
    badge?: number;
}

interface SideBarProps {
    onProfileClick: () => void;
}

const generateId = getIdGenerator();

export const SideBar = ({ onProfileClick }: SideBarProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const avatar = useSelector(selectUserAvatar);

    const menuItems: MenuItem[] = useMemo(() => [
        { text: 'Profile', icon: <Person />, id: generateId(), onClick: onProfileClick },
        { text: 'All chats', icon: <Home />, id: generateId(), onClick: () => navigate('/?tab=default') },
        { text: 'Archive chats', icon: <Archive />, id: generateId(), onClick: () => navigate('/?tab=archive') },
        { text: 'Contacts', icon: <Group />, id: generateId(), onClick: () => navigate('/?tab=contacts') },
        { text: 'Log out', icon: <Logout />, id: generateId(), onClick: () => {dispatch(logout()); dispatch(clearUserData());} },
    ], [onProfileClick, navigate, dispatch])

    return (
        <Drawer variant='permanent' className='sidebar'>
            <Box className='wrapper'>
                <Avatar alt='User Avatar' src={avatar ?? ''} className='avatar'/>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.id} sx={{ justifyContent: 'center', marginY: 1 }} disablePadding>
                            <ListItemButton sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                color: '#fff',
                            }}
                                            onClick={item.onClick}>
                                <ListItemIcon sx={{color: '#fff', minWidth: 'auto'}}>
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
