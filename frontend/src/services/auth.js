import axios from "axios"
import { getAuthToken, setAuthToken } from "../utils/authToken"
import { validateUsername, validatePassword } from "../lib/validation/authValidation"

export const login = async (loginCreds) => {
    const result = { success: false, message: "" }

    if (!validateUsername(loginCreds.username) ||
        !validatePassword(loginCreds.password)) {
        result.message = "Väärä käyttäjänimi tai salasana!"
        return result
    }

    try {
        const response = await axios.post("/api/auth/login", {
            username: loginCreds.username,
            password: loginCreds.password,
        })
        
        if (response.status === 200) {
            const token = response.headers["auth-token"]
            if (token) {
                setAuthToken(token)
                result.success = true
            } else {
                result.message = "Jokin meni pieleen! Yritä myöhemmin uudelleen tai ota yhteyttä asiakastukeen."
            }
        }
    } catch (e) {
        if (e.response.status === 400) {
            result.message = "Väärä käyttäjänimi tai salasana!"
        } else if (e.response.status === 500) {
            result.message = "Jokin meni pieleen! Yritä myöhemmin uudelleen tai ota yhteyttä asiakastukeen."
        }
    }
    return result
}

export const register = async (registerCreds) => {
    const result = { success: false, message: "" }

    if (!validateUsername(registerCreds.username) ||
        !validatePassword(registerCreds.password) ||
        registerCreds.password !== registerCreds.password2) {
        result.message = "Tarkista tietojen oikeinkirjoitus."
        return result
    }

    try {
        const response = await axios.post("/api/auth/register", {
            username: registerCreds.username,
            password: registerCreds.password,
            password2: registerCreds.password2
        })
        if (response.status === 201) {
            result.success = true
        }
    } catch (e) {
        if (e.response.status === 400) {
            result.message = "Tarkista tietojen oikeinkirjoitus."
        } else if (e.response.status === 403) {
            result.message = "Käyttäjänimi on jo varattu."
        } else if (e.response.status === 500) {
            result.message = "Jokin meni pieleen! Yritä myöhemmin uudelleen tai ota yhteyttä asiakastukeen."
        }
    }
    return result
}

export const verify_login = async () => {
    const token = getAuthToken()
    try {
        const response = await axios.get("api/auth/verify_login", {
            headers: {
                Authorization: token
            }
        })
        if (response.status === 200) return true
    } catch (e) {
        return false
    }
}