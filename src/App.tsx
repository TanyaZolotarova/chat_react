import './App.css'
import {Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import {NotFound} from "./pages/404";

function App() {

  return (
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default App
