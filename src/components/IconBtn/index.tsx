import { ReactNode } from 'react';
import { IconButton } from '@mui/material';


interface IconBtnProps {
    children: ReactNode;
    onClick?: () => void;
    size?: 'small' | 'medium' | 'large';
    sx?: object;
    disabled?: boolean;
}

export const IconBtn = ({children, onClick, size = 'medium', sx, disabled = false,}: IconBtnProps) => {
    return (
        <IconButton
            onClick={onClick}
            size={size}
            sx={sx}
            disabled={disabled}
        >
            {children}
        </IconButton>
    );
};
