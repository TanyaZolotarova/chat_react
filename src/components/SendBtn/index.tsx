import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface SendBtnProps {
    onClick: () => void;
    disabled?: boolean;
}

export const SendBtn: React.FC<SendBtnProps> = ({ onClick, disabled }) => {
    return (
        <IconButton
            onClick={onClick}
            disabled={disabled}
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
