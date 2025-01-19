import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
