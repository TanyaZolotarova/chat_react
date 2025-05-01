import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ChatList } from '../pages/ChatList';
import { NotFound } from '../pages/NotFound';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthGuard } from '../entities/auth/authGuard.tsx';

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={
                    <AuthGuard>
                        <Login />
                    </AuthGuard>
                } />
                <Route path='/register' element={
                    <AuthGuard>
                        <Register />
                    </AuthGuard>
                } />
                <Route path='/chats' element={
                    <ProtectedRoute>
                        <ChatList />
                    </ProtectedRoute>
                } />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
}
