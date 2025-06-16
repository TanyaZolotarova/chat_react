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
import { setUserData, selectUserName, selectUserEmail, selectUserAvatar } from '../../entities/user/userSlice.ts';
import { ALLOWED_IMAGE_TYPES } from '../../components/Utils/constants.ts';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
    const dispatch = useDispatch();

    const name = useSelector(selectUserName);
    const email = useSelector(selectUserEmail);
    const avatar = useSelector(selectUserAvatar);

    const [isFullImage, setIsFullImage] = useState(false);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedName = formData.get('name')?.toString() || null;
        const updatedEmail = formData.get('email')?.toString() || null;
        const avatarFile = formData.get('avatar');
        let updatedAvatar = avatar;

        if (avatarFile && avatarFile instanceof File && ALLOWED_IMAGE_TYPES.includes(avatarFile.type)) {
            updatedAvatar = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    if (typeof reader.result === 'string') {
                        resolve(reader.result);
                    }
                });
                reader.readAsDataURL(avatarFile);
            });
        }

        dispatch(setUserData({
            name: updatedName,
            email: updatedEmail,
            avatar: updatedAvatar,
        }));

        onClose();
    };

    return (
        <>
            <Dialog open={isOpen} onClose={onClose}>
                <DialogTitle sx={{textAlign: 'center', fontSize: '32px', fontWeight: '700'}}>Profile Info</DialogTitle>
                <form onSubmit={handleSave}>
                    <DialogContent>
                        <Container
                            sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                            <Avatar src={avatar || ''} sx={{ width: 64, height: 64, mb: 2 }}
                                    onClick={() => setIsFullImage(true)}/>
                            <Button variant='contained' component='label' startIcon={<CloudUploadIcon />}
                                    sx={{ bgcolor: '#1E1E2F' }}>
                                Upload Avatar
                                <input type='file' name='avatar' hidden accept='image/*' />
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
                    <Container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <DialogActions>
                            <Button type='submit' variant='contained' sx={{ bgcolor: '#1E1E2F' }}>Save</Button>
                        </DialogActions>
                        <DialogActions>
                            <Button onClick={onClose} variant='contained' sx={{ bgcolor: '#1E1E2F' }}>Close</Button>
                        </DialogActions>
                    </Container>
                </form>
            </Dialog>
            <Dialog open={isFullImage} onClose={() => setIsFullImage(false)}>
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
                        onClick={() => setIsFullImage(false)}
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
