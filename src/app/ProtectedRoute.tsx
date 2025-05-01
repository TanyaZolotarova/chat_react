import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store.ts';

interface Props {
    children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props) => {
    const authToken = useSelector((state: RootState) => state.auth.authToken);

    if (!authToken) {
        return <Navigate to="/" replace />;
    }

    return children;
};
