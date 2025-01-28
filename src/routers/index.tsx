import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Login} from '../pages/Login';
import {Register} from '../pages/Register';
import {NotFound} from '../pages/NotFound';

export const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </Router>
    )
}