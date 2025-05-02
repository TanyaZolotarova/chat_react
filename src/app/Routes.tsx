import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ChatList } from '../pages/ChatList';
import { NotFound } from '../pages/NotFound';
import { ProtectedRoute } from '../components/Helper/ProtectedRoute.tsx';

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={
                    <ProtectedRoute requireAuth={false}>
                        <Login />
                    </ProtectedRoute>
                } />
                <Route path='/register' element={
                    <ProtectedRoute requireAuth={false}>
                        <Register />
                    </ProtectedRoute>
                } />
                <Route path='/' element={
                    <ProtectedRoute>
                        <ChatList />
                    </ProtectedRoute>
                } />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
}
