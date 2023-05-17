import db from "../database/db.js"

export const createMessageService = async (creatorId, chatId, value) => {
    return await db.messages.create({
        creatorId,
        chatId,
        value,
        timestamp: new Date().toISOString()
    })
}

export const getMessagesFromChatService = async (chat) => {
    return await chat.getChatMessages()
}