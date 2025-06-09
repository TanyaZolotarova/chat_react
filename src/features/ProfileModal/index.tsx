import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { setUserData } from '../../entities/user/userSlice.ts';
import { RootState } from '../../app/store.ts';

interface ProfileModalProps {
    open: boolean;
    onClose: () => void;
}

export const ProfileModal = ({ open, onClose }: ProfileModalProps) => {
    const dispatch = useDispatch();

    const { name, email, avatar } = useSelector((state: RootState) => state.user);

    const [showFullImage, setShowFullImage] = useState(false);

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    dispatch(setUserData({ name, email, avatar: reader.result }));
                }
            };
            reader.readAsDataURL(file);
        }

    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedName = formData.get('name')?.toString() || null;
        const updatedEmail = formData.get('email')?.toString() || null;
        dispatch(
            setUserData({
                name: updatedName,
                email: updatedEmail,
                avatar,
            })
        );
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle sx={{textAlign:'center', fontSize:'32px', fontWeight:'700'}}>Profile Info</DialogTitle>
                <form onSubmit={handleSave}>
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
                        name='name'
                        defaultValue={name ?? ''}
                        fullWidth
                    />
                    <TextField
                        margin='normal'
                        label='Email'
                        name='email'
                        defaultValue={email ?? ''}
                        fullWidth
                    />
                </DialogContent>
                <Container sx={{ display:'flex', justifyContent:'flex-end' }}>
                    <DialogActions>
                        <Button type='submit' variant='contained' sx={{ bgcolor:'#1E1E2F'}}>Save</Button>
                    </DialogActions>
                    <DialogActions>
                        <Button onClick={onClose} variant='contained' sx={{ bgcolor:'#1E1E2F'}}>Close</Button>
                    </DialogActions>
                </Container>
                </form>
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
