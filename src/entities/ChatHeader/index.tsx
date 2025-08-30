import { useState } from 'react';
import { Avatar, Badge, Box, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IconBtn } from '../../components/IconBtn';

interface ChatHeaderProps {
    name: string;
    status: string;
    avatar: string;
}

export const ChatHeader = ({ name, status, avatar }: ChatHeaderProps) => {
    const [isAvatarOpen, setIsAvatarOpen] = useState(false);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    px: 4,
                    py: 2,
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                    zIndex: 1,
                    position: 'relative',
                }}
            >
                <Badge
                    overlap='circular'
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant='dot'
                    color={status === 'online' ? 'success' : 'default'}
                >
                    <Avatar
                        alt={name}
                        src={avatar}
                        sx={{ cursor: 'pointer', width: 50, height: 50 }}
                        onClick={() => setIsAvatarOpen(true)}
                    />
                </Badge>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 0.5, textAlign: 'left'}}>
                    <Typography fontWeight={600} fontSize={18}>
                        {name}
                    </Typography>
                    <Typography fontSize={13} color={status === 'online' ? '#3fc86b' : '#868686'}>
                        {status}
                    </Typography>
                </Box>
            </Box>
            <Modal open={isAvatarOpen} onClose={() => setIsAvatarOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        boxShadow: 24,
                        borderRadius: 2,
                        p: 2,
                        outline: 'none',
                        maxWidth: 400,
                        textAlign: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconBtn onClick={() => setIsAvatarOpen(false)}>
                            <CloseIcon />
                        </IconBtn>
                    </Box>
                    <Avatar
                        src={avatar}
                        alt={name}
                        sx={{ width: 200, height: 200, margin: '0 auto' }}
                    />
                </Box>
            </Modal>
        </>
    )
}
