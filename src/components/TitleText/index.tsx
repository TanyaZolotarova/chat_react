import { Typography, TypographyProps } from '@mui/material';

interface TitleTextProps extends TypographyProps {
    title: string;
    component: React.ElementType;
}

export const TitleText: React.FC<TitleTextProps> = ({ title, component, variant }) => {
    return (
        <Typography
            variant={variant}
            component={component}
            sx={{ p: 0.5 }}
        >
            {title}
        </Typography>
    );
}
