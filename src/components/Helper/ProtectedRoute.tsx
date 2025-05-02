import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store.ts';

interface Props {
    children: JSX.Element;
    requireAuth?: boolean;
}

export const ProtectedRoute = ({ children, requireAuth = true }: Props) => {
    const authToken = useSelector((state: RootState) => state.auth.authToken);

    if (requireAuth && !authToken) {
        return <Navigate to='/login' replace />;
    }

    if (!requireAuth && authToken) {
        return <Navigate to='/' replace />;
    }

    return children;
};

