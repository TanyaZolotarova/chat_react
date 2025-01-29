import {createRoot} from 'react-dom/client'
import {StrictMode} from 'react'
import {App} from './index.tsx';
import './style.css'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
