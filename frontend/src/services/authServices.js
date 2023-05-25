import axios from "axios"
import { clearAuthToken, getAuthToken, setAuthToken } from "../utils/authToken"
import { validateUsername, validatePassword } from "../utils/validation/authValidation"

export const loginService = async (loginCreds) => {
    const result = { success: false, message: "" }

    if (!validateUsername(loginCreds.username) ||
        !validatePassword(loginCreds.password)) {
        result.message = "Väärä käyttäjänimi tai salasana!"
        return result
    }

    const response = await axios.post("/api/auth/login", {
        username: loginCreds.username,
        password: loginCreds.password,
    }).catch((error) => { return error.response })

    if (response.status === 200) {
        const token = response.headers["auth-token"]
        if (token) {
            setAuthToken(token)
            result.success = true
        } else {
            result.message = "Jokin meni pieleen! Yritä myöhemmin uudelleen."
        }
    } else if (response.status === 400) {
        result.message = "Väärä käyttäjänimi tai salasana!"
    } else {
        result.message = "Jokin meni pieleen! Yritä myöhemmin uudelleen."
    }

    return result
}

export const registerService = async (registerCreds) => {
    const result = { success: false, message: "" }

    if (!validateUsername(registerCreds.username) ||
        !validatePassword(registerCreds.password) ||
        registerCreds.password !== registerCreds.password2) {
        result.message = "Tarkista tietojen oikeinkirjoitus."
        return result
    }

    const response = await axios.post("/api/auth/register", {
        username: registerCreds.username,
        password: registerCreds.password,
        password2: registerCreds.password2
    }).catch((error) => { return error.response })

    if (response.status === 201) {
        result.success = true
    } else if (response.status === 400) {
        result.message = "Tarkista tietojen oikeinkirjoitus."
    } else if (response.status === 403) {
        result.message = "Käyttäjänimi on jo varattu."
    } else {
        result.message = "Jokin meni pieleen! Yritä myöhemmin uudelleen."
    }

    return result
}

export const verifyLoginService = async () => {

    const response = await axios.get("api/auth/verify_login", {
        headers: {
            Authorization: getAuthToken()
        }
    }).catch((error) => { return error.response })

    return response.status === 200 ? true : false
}

export const logoutService = async (navigate) => {
    clearAuthToken()
    navigate("/login")
}