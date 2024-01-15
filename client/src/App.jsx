import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Register } from "./components/Authorization/Register"; 
import { Login } from "./components/Authorization/Login"; 


const App = () =>{
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="Register" element={<Register/>} />
      <Route path="Login" element={<Login/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
