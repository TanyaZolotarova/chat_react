import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ChatList } from '../pages/ChatList';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/chats' element={<ChatList/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </Router>
    );
}
