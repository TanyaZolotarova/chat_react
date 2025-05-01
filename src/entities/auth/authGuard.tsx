import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store.ts';

interface Props {
    children: JSX.Element;
}

export const AuthGuard = ({ children }: Props) => {
    const authToken = useSelector((state: RootState) => state.auth.authToken);

    if (authToken) {
        return <Navigate to='/chats' replace />;
    }

    return children;
};
