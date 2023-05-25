import { useEffect, useState } from "react"
import { verifyLoginService } from "../services/authServices.js"
import { Navigate } from "react-router-dom"

const AuthRoute = ({ children }) => {

    const [verifiedLogin, setVerifiedLogin] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const result = await verifyLoginService()
            setVerifiedLogin(result)
        }
        getData()
    }, [])

    if (verifiedLogin === null) return <div></div>

    return verifiedLogin
        ? children
        : <Navigate to="/login" />
}

export default AuthRoute