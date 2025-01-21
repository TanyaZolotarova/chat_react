import {Typography} from '@mui/material';
import {ElementType} from 'react';

interface TitleTextProps {
    title: string;
    component: ElementType;
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button';
}

export const TitleText: React.FC<TitleTextProps> = ({title, component, variant}) => {
    return (
        <Typography variant={variant} component={component} sx={{p: 0.5}}>{title}</Typography>
    )
}