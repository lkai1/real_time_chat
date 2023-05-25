import { validateChatId, validateMessage } from "../lib/validation/messageValidation"
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

    const result = { success: false, message: "" }

    if (!message) return

    if (!validateChatId(chatId) ||
        !validateMessage(message)) {
        result.message = "Viestin lähetyksessä esiintyi virhe."
        return result
    }

    const response = await axios.post("/api/message",
        {
            message,
            chatId
        },
        {
            headers: { Authorization: getAuthToken() }
        }
    ).catch((error) => {
        result.message = "Viestin lähetyksessä esiintyi virhe."
        return error.response
    })

    if (response.status === 201) result.success = true

    return result
}