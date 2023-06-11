import axios from "axios"
import { getAuthToken } from "../utils/authToken"

export const getUserInfoService = async () => {
    const response = await axios.get("/api/user/user_info", {
        headers: {
            Authorization: getAuthToken()
        }
    }).catch((_error) => { return })

    return response.data
}

export const deleteUserService = async () => {
    const result = { success: false, message: "" }

    const response = await axios.delete("/api/user", {
        headers: {
            Authorization: getAuthToken()
        }
    }).catch((error) => {
        result.message = "Käyttäjän poistamisessa esiintyi virhe."
        return error.response
    })

    if (response.status === 200) result.success = true

    return result
}