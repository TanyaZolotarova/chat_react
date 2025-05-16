import { NavigateFunction, useNavigate } from 'react-router-dom';
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
import { AppDispatch, RootState } from '../../app/store.ts';
import { logout } from '../../entities/auth/authSlice.ts'
import { logoutUser } from '../../entities/user/userSlice.ts';
import { getIdGenerator } from '../../components/Utils';
import './style.css';

interface MenuItem {
    id: number;
    text: string;
    icon: React.ReactNode;
    onClick: (dispatch: AppDispatch, navigate: NavigateFunction) => void;
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

    const avatar = useSelector((state: RootState) => state.user.avatar);

    const menuItems: MenuItem[] = [
        {text: 'Profile', icon: <Person/>, id: generateId(), onClick: () => onProfileClick()},
        {text: 'All chats', icon: <Home/>, id: generateId(), onClick: (_, navigate) => navigate('/')},
        {text: 'Archive chats', icon: <Archive/>, id: generateId(), onClick: (_, navigate) => navigate('/?tab=archive')},
        {text: 'Contacts', icon: <Group/>, id: generateId(), onClick: (_, navigate) => navigate('/?tab=contacts')},
        {text: 'Log out', icon: <Logout/>, id: generateId(), onClick: (dispatch, navigate) => {
                dispatch(logout());
                dispatch(logoutUser());
                navigate('/login');
            }},
    ];

    return (
        <Drawer variant='permanent' className='sidebar'>
            <Box className='wrapper'>
                <Avatar alt='User Avatar' src={avatar || ''} className='avatar'/>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.id} sx={{justifyContent: 'center', marginY: 1}} disablePadding>
                            <ListItemButton sx={{display: 'flex', flexDirection: 'column', color: '#fff'}}
                                            onClick={() => item.onClick(dispatch, navigate)}>
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
