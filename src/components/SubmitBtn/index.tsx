import { Button } from '@mui/material'

interface BtnProps {
    text: string;
    disabled?: boolean;
}

export const SubmitBtn: React.FC<BtnProps> = ({ text, disabled }) => {
    return (
        <Button
            type='submit'
            variant='contained'
            sx={{ background: '#2a2931', m: 1, px: 6 }}
            size='large'
            disabled={disabled}
        >
            {text}
        </Button>
    );
}
