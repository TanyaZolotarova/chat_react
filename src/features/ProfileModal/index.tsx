import { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Avatar,
    Container,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface ProfileModalProps {
    open: boolean;
    onClose: () => void;
}

export const ProfileModal = ({ open, onClose }: ProfileModalProps) => {
    const [avatar, setAvatar] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [showFullImage, setShowFullImage] = useState(false);

    useEffect(() => {
        const storedAvatar = localStorage.getItem('avatar');
        const storedName = localStorage.getItem('name') || 'Anonymous';
        const storedEmail = localStorage.getItem('email') || 'Not available';
        setAvatar(storedAvatar);
        setName(storedName);
        setEmail(storedEmail);
    }, []);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result as string;
                localStorage.setItem('avatar', base64);
                setAvatar(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle sx={{textAlign:'center', fontSize:'32px', fontWeight:'700'}}>Profile Info</DialogTitle>
                <DialogContent>
                    <Container sx={{ mb: 2, display:'flex', justifyContent:'center', alignItems:'center', gap: 4 }}>
                        <Avatar src={avatar || ''} sx={{ width: 64, height: 64, mb: 2 }} onClick={() => setShowFullImage(true)}/>
                        <Button variant='contained' component='label' startIcon={<CloudUploadIcon />} sx={{ bgcolor:'#1E1E2F'}}>
                            Upload Avatar
                            <input type='file' hidden onChange={handleAvatarChange} accept='image/*' />
                        </Button>
                    </Container>
                    <TextField
                        margin='normal'
                        label='Name'
                        value={name}
                        fullWidth
                        disabled
                    />
                    <TextField
                        margin='normal'
                        label='Email'
                        value={email}
                        fullWidth
                        disabled
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} variant='contained' sx={{ bgcolor:'#1E1E2F'}}>Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={showFullImage} onClose={() => setShowFullImage(false)}>
                <DialogTitle
                    sx={{
                        m: 0,
                        p: 1,
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <IconButton
                        aria-label='close'
                        onClick={() => setShowFullImage(false)}
                        sx={{
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center' }}>
                    <img
                        src={avatar || ''}
                        alt='Full Avatar'
                        style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '10px' }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};
