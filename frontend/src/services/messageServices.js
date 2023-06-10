import { validateChatId, validateMessage } from "../utils/validation/messageValidation.js"
import { getAuthToken } from "../utils/authToken.js"
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

export const deleteAllUserMessagesFromChatService = async (chatId) => {
    const result = { success: false, message: "" }

    if (!validateChatId(chatId)) {
        result.message = "Viestien poistamisessa esiintyi virhe."
        return result
    }

    const response = await axios.delete("/api/message/all_from_user", {
        headers: {
            Authorization: getAuthToken()
        },
        data: {
            chatId
        }
    }
    ).catch((error) => {
        result.message = "Viestien poistamisessa esiintyi virhe."
        return error.response
    })

    if (response.status === 200) result.success = true

    return result
}