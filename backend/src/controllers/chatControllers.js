import { validateCreatePrivateChatParams, validateCreateGroupChatParams, validateAddGroupChatParticipantParams } from "../utils/validation/chatValidation.js"
import { createPrivateChatService, createGroupChatService, getPrivateChatBetweenUsersService, getUserChatsService, getGroupChatNameExistsService, getChatFromIdService, getUserIsChatParticipantService, getUserIsChatCreatorService, addGroupChatParticipantService, deleteChatService } from "../services/chatServices.js"
import { getUserFromJWTService, getUserFromUsernameService } from "../services/userServices.js"

export const createPrivateChatController = async (request, response) => {
    try {

        if (!validateCreatePrivateChatParams(request.body)) return response.status(400).send("Invalid parameters!")

        const { participantUsername } = request.body
        const token = request.headers.authorization

        const user = await getUserFromJWTService(token)
        const participant = await getUserFromUsernameService(participantUsername)

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

        const chatNameExists = await getGroupChatNameExistsService(chatName)
        if (chatNameExists) return response.status(403).send("Group chat name is already taken.")

        await createGroupChatService(user, chatName)

        response.status(201).send("Group chat was created.")
    } catch (_error) {
        response.status(500).send("Something went wrong! Try again later.")
    }
}

export const addGroupChatParticipantController = async (request, response) => {
    try {

        if (!validateAddGroupChatParticipantParams(request.body)) return response.status(400).send("Invalid parameters!")

        const { chatId, participantUsername } = request.body
        const token = request.headers.authorization

        const user = await getUserFromJWTService(token)
        const participant = await getUserFromUsernameService(participantUsername)

        const chat = await getChatFromIdService(chatId)

        if (!user || !participant) return response.status(404).send("User or users not found.")

        if (!chat) return response.status(404).send("Chat not found.")

        if (!chat.isGroup) return response.status(403).send("Can't add participants to private chat!")

        const userIsChatParticipant = await getUserIsChatParticipantService(user.id, chat.id)
        const participantIsChatParticipant = await getUserIsChatParticipantService(participant.id, chat.id)
        const userIsChatCreator = await getUserIsChatCreatorService(user.id, chat.id)

        if (!userIsChatParticipant || !userIsChatCreator) return response.status(403).send("You can't add participants!")

        if (participantIsChatParticipant) return response.status(403).send("User is already chat participant.")

        await addGroupChatParticipantService(chat, participant)

        response.status(201).send("Participant added to group chat.")

    } catch (_error) {
        response.status.send("Something went wrong! Try again later.")
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

export const deleteChatController = async (request, response) => {
    try {
        const token = request.headers.authorization
        const { chatId } = request.body

        const user = await getUserFromJWTService(token)
        const chat = await getChatFromIdService(chatId)

        if (!user) return response.status(404).send("User not found.")
        if (!chat) return response.status(404).send("Chat not found.")
        if (chat.creatorId !== user.id) return response.status(403).send("Only chat creator can delete chat.")

        await deleteChatService(chat)

        response.status(200).send("Chat deleted.")
    } catch (_error) {
        response.status(500).send("Something went wrong! Try again later.")
    }
}
