/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import ProtectedRouter from "./components/ProtectedRoute"

// write logout function
function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

// write register and logout function
function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <>
      <h1>Hello world</h1>      
    </>
  )
}

export default App
