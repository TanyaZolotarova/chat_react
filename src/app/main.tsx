import {createRoot} from 'react-dom/client'
import {StrictMode} from 'react'
import Index from './index.tsx'
import '../index.css'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Index/>
    </StrictMode>,
)
