import axios from "axios"
import { getAuthToken } from "../utils/authToken"
import { validateUsername } from "../utils/validation/authValidation"
import { validateChatName } from "../utils/validation/chatValidation"

export const getUserChatsService = async () => {

    const response = await axios.get("/api/chat", {
        headers: {
            Authorization: getAuthToken()
        }
    }).catch((_error) => { return })

    return response.data
}

export const createPrivateChatService = async (participantUsername) => {
    const result = { success: false, message: "" }

    if (!validateUsername(participantUsername)) {
        result.message = "Tarkista oikeinkirjoitus."
        return result
    }

    const response = await axios.post("/api/chat/private",
        {
            participantUsername
        },
        {
            headers: { Authorization: getAuthToken() }
        }
    ).catch((e) => { return e.response })

    if (response.status === 201) {
        result.success = true
        result.message = "Yksityiskeskustelun luonti onnistui."
    } else if (response.status === 400) {
        result.message = "Tarkista oikeinkirjoitus."
    } else if (response.status === 403) {
        result.message = "Et voi luoda yksityiskeskustelua kyseisen käyttäjän kanssa. Onko teillä jo olemassa oleva yksityiskeskustelu?"
    } else if (response.status === 404) {
        result.message = "Käyttäjää ei löytynyt."
    } else {
        result.message = "Jokin meni pieleen! Yritä myöhemmin uudelleen."
    }

    return result
}

export const createGroupChatService = async (chatName) => {
    const result = { success: false, message: "" }

    if (!validateChatName(chatName)) {
        result.message = "Tarkista oikeinkirjoitus."
        return result
    }

    const response = await axios.post("/api/chat/group",
        {
            chatName
        },
        {
            headers: { Authorization: getAuthToken() }
        }
    ).catch((e) => { return e.response })

    if (response.status === 201) {
        result.success = true
        result.message = "Ryhmäkeskustelun luonti onnistui."
    } else if (response.status === 400) {
        result.message = "Tarkista oikeinkirjoitus."
    } else if (response.status === 403) {
        result.message = "Ryhmäkeskustelun nimi on jo varattu."
    } else {
        result.message = "Jokin meni pieleen! Yritä myöhemmin uudelleen."
    }

    return result
}

