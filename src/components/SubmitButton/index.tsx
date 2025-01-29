import {Button} from '@mui/material'

interface BtnProps {
    text: string;
}

export const SubmitBtn: React.FC<BtnProps> = ({text}) => {
    return (
        <Button type='submit' variant='contained' sx={{background: '#2a2931', m: 1, px: 6}} size='large'>{text}</Button>
    )
}
