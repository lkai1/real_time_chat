import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import LoginPage from "../pages/LoginPage.js"
import RegisterPage from "../pages/RegisterPage.js"
import MainPage from "../pages/MainPage.js"
import UserSettingsPage from "../pages/UserSettingsPage.js"
import AuthRoute from "./AuthRoute.js"
import NoAuthRoute from "./NoAuthRoute.js"
import UserInfoProvider from "../contexts/UserInfoContext.js"
import SelectedChatProvider from "../contexts/SelectedChatContext.js"
import SocketProvider from "../contexts/SocketContext.js"


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<NoAuthRoute><LoginPage /></NoAuthRoute>} />
                <Route path="/register" element={<NoAuthRoute><RegisterPage /></NoAuthRoute>} />
                <Route path="/main" element={
                    <AuthRoute>
                        <UserInfoProvider>
                            <SelectedChatProvider>
                                <SocketProvider>
                                    <MainPage />
                                </SocketProvider>
                            </SelectedChatProvider>
                        </UserInfoProvider>
                    </AuthRoute>
                } />
                <Route path="/user_settings" element={
                    <AuthRoute>
                        <UserInfoProvider>
                            <SocketProvider>
                                <UserSettingsPage />
                            </SocketProvider>
                        </UserInfoProvider>
                    </AuthRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default Router