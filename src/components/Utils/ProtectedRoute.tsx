import { Navigate } from 'react-router-dom';

interface Props {
    children: JSX.Element;
    authToken: string | null;
    requireAuth?: boolean;
}

export const ProtectedRoute = ({ children, requireAuth = true, authToken }: Props) => {

    if (requireAuth && !authToken) {
        return <Navigate to='/login' replace />;
    }

    if (!requireAuth && authToken) {
        return <Navigate to='/' replace />;
    }

    return children;
};

