/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoute"

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

    <BrowserRouter >
    <Routes>
      {/* wrap home in protected route so that only authorized users can access that page */}
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterAndLogout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
