import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import MainPage from "../pages/MainPage"
import AuthRoute from "./AuthRoute"
import NoAuthRoute from "./NoAuthRoute"


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<NoAuthRoute><LoginPage /></NoAuthRoute>} />
                <Route path="/register" element={<NoAuthRoute><RegisterPage /></NoAuthRoute>} />
                <Route path="/main" element={<AuthRoute><MainPage /></AuthRoute>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router