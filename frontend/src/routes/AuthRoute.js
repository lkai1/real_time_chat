import { useEffect, useState } from "react"
import { verify_login } from "../services/auth"
import { Navigate } from "react-router-dom"

const AuthRoute = ({ children }) => {

    const [verifiedLogin, setVerifiedLogin] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const result = await verify_login()
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