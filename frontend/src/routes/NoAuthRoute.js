import { verifyLoginService } from "../services/authServices.js"
import { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom"

const NoAuthRoute = ({ children }) => {
    const [verifiedLogin, setVerifiedLogin] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const response = await verifyLoginService()
            setVerifiedLogin(response)
        }
        getData()
    }, [])

    if (verifiedLogin === null) return <div></div>

    return !verifiedLogin
        ? children
        : <Navigate to="/main" />
}

export default NoAuthRoute