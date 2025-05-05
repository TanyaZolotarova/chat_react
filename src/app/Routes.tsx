import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ChatList } from '../pages/ChatList';
import { NotFound } from '../pages/NotFound';
import { ProtectedRoute } from '../components/Utils/ProtectedRoute.tsx';
import { RootState } from './store.ts';

export const AppRoutes = () => {
    const authToken = useSelector((state: RootState) => state.auth.authToken);

    return (
        <Router>
            <Routes>
                <Route path='/login' element={
                    <ProtectedRoute requireAuth={false} authToken={authToken}>
                        <Login />
                    </ProtectedRoute>
                } />
                <Route path='/register' element={
                    <ProtectedRoute requireAuth={false} authToken={authToken}>
                        <Register />
                    </ProtectedRoute>
                } />
                <Route path='/' element={
                    <ProtectedRoute authToken={authToken}>
                        <ChatList />
                    </ProtectedRoute>
                } />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
}
