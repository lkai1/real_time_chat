import { validateCreatePrivateChatParams, validateCreateGroupChatParams } from "../utils/validation/chatValidation.js"
import { createPrivateChatService, createGroupChatService, getPrivateChatBetweenUsersService, getUserChatsService, getGroupChatNameExists } from "../services/chatServices.js"
import { getUserFromJWTService, getUserFromIdService } from "../services/userServices.js"

export const createPrivateChatController = async (request, response) => {
    try {

        if (!validateCreatePrivateChatParams(request.body)) return response.status(400).send("Invalid parameters!")

        const { participantId } = request.body
        const token = request.headers.authorization

        const user = await getUserFromJWTService(token)
        const participant = await getUserFromIdService(participantId)

        if (!user || !participant) return response.status(404).send("User or users not found.")

        if (user.id === participant.id) {
            return response.status(403).send("Can't create a private chat with yourself!")
        }

        const privateChatBetweenUsers = await getPrivateChatBetweenUsersService(user.id, participant.id)

        if (privateChatBetweenUsers) return response.status(403).send("Private chat between these users already exists!")

        await createPrivateChatService(user, participant)

        response.status(201).send("Private chat was created.")
    } catch (_error) {
        response.status(500).send("Something went wrong! Try again later.")
    }
}

export const createGroupChatController = async (request, response) => {
    try {

        if (!validateCreateGroupChatParams(request.body)) return response.status(400).send("Invalid parameters!")

        const { chatName } = request.body
        const token = request.headers.authorization

        const user = await getUserFromJWTService(token)

        if (!user) return response.status(404).send("User not found.")

        const chatNameExists = await getGroupChatNameExists(chatName)
        if (chatNameExists) return response.status(403).send("Group chat name is already taken.")

        await createGroupChatService(user, chatName)

        response.status(201).send("Group chat was created.")
    } catch (_error) {
        response.status(500).send("Something went wrong! Try again later.")
    }
}

export const getUserChatsController = async (request, response) => {
    try {

        const token = request.headers.authorization
        const user = await getUserFromJWTService(token)

        if (!user) return response.status(404).send("User not found.")

        const chats = await getUserChatsService(user)

        response.status(200).json(chats)
    } catch (_error) {
        response.status(500).send("Something went wrong! Try again later.")
    }
}
