import { getAuthToken } from "../utils/authToken"
import axios from "axios"

export const getChatMessagesService = async (chatId) => {

    const response = await axios.get("/api/message",
        {
            params: { chatId },
            headers: {
                Authorization: getAuthToken()
            }
        }
    ).catch((_error) => { return })

    return response.data
}

export const createMessageService = async (chatId, message) => {

    await axios.post("/api/message",
        {
            message,
            chatId
        },
        {
            headers: { Authorization: getAuthToken() }
        }
    ).catch((_error) => { return })
}