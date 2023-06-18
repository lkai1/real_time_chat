import db from "../database/db.js"
import { Op } from "sequelize"

export const createPrivateChatService = async (user, participant) => {
    const chat = await user.createUserChat({
        isGroup: false
    })
    await chat.addChatParticipants([user, participant])
    return chat.id
}

export const createGroupChatService = async (user, chatName) => {
    const chat = await user.createUserChat({
        isGroup: true,
        chatName,
    })
    await chat.addChatParticipants([user])
    return chat.id
}

export const getPrivateChatBetweenUsersService = async (userId, userId2) => {
    return await db.chats.findOne({
        include: {
            model: db.chatParticipants,
            as: "ChatParticipants",
            duplicating: false,
        },
        where: {
            isGroup: false,
            [Op.or]: [
                {
                    creatorId: userId,
                    "$ChatParticipants.userId$": userId2
                },
                {
                    creatorId: userId2,
                    "$ChatParticipants.userId$": userId
                }
            ]
        }
    })
}

export const getUserChatsService = async (user) => {
    return await db.chatParticipants.findAll({
        where: { userId: user.id },
        attributes: [],
        include: {
            model: db.chats,
            include: {
                model: db.users,
                as: "chatParticipants",
                attributes: ["id", "username"],
                through: { attributes: [] }
            }
        },
    })
}

export const getUserIsChatParticipantService = async (userId, chatId) => {
    return await db.chatParticipants.findOne({
        where: {
            userId,
            chatId
        }
    }) ? true : false
}

export const getChatFromIdService = async (chatId) => {
    return await db.chats.findOne({ where: { id: chatId } })
}

export const getChatWithParticipantIdsFromIdService = async (chatId) => {
    return await db.chats.findOne({
        where: { id: chatId },
        include: {
            model: db.chatParticipants,
            attributes: ["userId"]
        },
    })
}

export const getGroupChatNameExistsService = async (chatName) => {
    return await db.chats.findOne({ where: { chatName, isGroup: true } }) ? true : false
}

export const getUserIsChatCreatorService = async (userId, chatId) => {
    return await db.chats.findOne({
        where: {
            id: chatId,
            creatorId: userId
        }
    }) ? true : false
}

export const getChatsCreatedByUserService = async (userId) => {
    return await db.chats.findAll({
        where: { creatorId: userId }
    })
}

export const addGroupChatParticipantService = async (chat, participant) => {
    await chat.addChatParticipants([participant])
}

export const deleteChatService = async (chat) => {
    await db.messages.destroy({ where: { chatId: chat.id } })
    await db.chatParticipants.destroy({ where: { chatId: chat.id } })
    await chat.destroy({ where: { id: chat.id } })
}