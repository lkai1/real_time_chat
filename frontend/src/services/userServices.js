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