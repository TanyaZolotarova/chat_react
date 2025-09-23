import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface SendBtnProps {
    type: 'submit' | 'button';
}

export const SendBtn: React.FC<SendBtnProps> = ({ type }) => {
    return (
        <IconButton
            type={type}
            size='small'
            sx={{
                ml: 1,
                backgroundColor: '#1E1E2F',
                color: '#fff',
                '&:hover': { backgroundColor: '#2a2931' },
                width: 40,
                height: 40,
            }}
        >
            <SendIcon />
        </IconButton>
    );
};
