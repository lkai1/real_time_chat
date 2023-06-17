import axios from "axios"
import { getAuthToken } from "../utils/authToken.js"
import { validateChatId, validateChatName, validateUsername } from "../utils/validation/chatValidation.js"

export const getUserChatsService = async () => {

    const response = await axios.get("/api/chat", {
        headers: {
            Authorization: getAuthToken()
        }
    }).catch((e) => { return e.response })

    return response.data
}

export const createPrivateChatService = async (participantUsername) => {
    const result = { success: false, message: "", data: "" }

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
        result.data = response.data
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
    const result = { success: false, message: "", data: "" }

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
        result.data = response.data
    } else if (response.status === 400) {
        result.message = "Tarkista oikeinkirjoitus."
    } else if (response.status === 403) {
        result.message = "Ryhmäkeskustelun nimi on jo varattu."
    } else {
        result.message = "Jokin meni pieleen! Yritä myöhemmin uudelleen."
    }

    return result
}

export const addGroupChatParticipantService = async (chatId, participantUsername) => {
    const result = { success: false, message: "", data: "" }

    if (!validateUsername(participantUsername)) {
        result.message = "Onko käyttäjänimi oikeassa muodossa?"
        return result
    }

    if (!validateChatId(chatId)) {
        result.message = "Chatin tunniste on epämuodostunut!"
        return result
    }

    const response = await axios.post("/api/chat/group/participant",
        {
            chatId,
            participantUsername
        },
        {
            headers: { Authorization: getAuthToken() }
        }
    ).catch((e) => { return e.response })

    if (response.status === 201) {
        result.success = true
        result.message = "Uusi käyttäjä lisätty keskusteluun."
        result.data = response.data
    } else if (response.status === 403) {
        result.message = "Et voi lisätä käyttäjää tähän keskusteluun!"
    } else if (response.status === 404) {
        result.message = "Käyttäjiä tai chattia ei löytynyt. Onko joku näistä poistettu? Kokeile päivittää sivu."
    } else {
        result.message = "Jokin meni pieleen! Yritä myöhemmin uudelleen."
    }

    return result
}

export const deleteChatService = async (chatId) => {
    const result = { success: false, message: "" }

    if (!validateChatId(chatId)) {
        result.message = "Chatin tunniste on epämuodostunut!"
        return result
    }

    const response = await axios.delete("/api/chat", {
        headers: {
            Authorization: getAuthToken()
        },
        data: {
            chatId
        }
    }

    ).catch((e) => { return e.response })

    if (response.status === 200) {
        result.success = true
    } else if (response.status === 403) {
        result.message = "Et voi poistaa chattia."
    } else if (response.status === 404) {
        result.message = "Käyttäjää tai chattia ei löytynyt. Onko joku näistä poistettu? Kokeile päivittää sivu."
    } else {
        result.message = "Jokin meni pieleen! Yritä myöhemmin uudelleen."
    }

    return result

}

