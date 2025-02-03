import { Link } from 'react-router-dom';
import './style.css'

interface LinkProps {
    text: string;
    to: string;
}

export const LinkBtn: React.FC<LinkProps> = ({ text, to }) => {
    return (
        <Link to={to} className='link_btn'>
            {text}
        </Link>
    );
}
