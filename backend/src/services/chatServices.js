import db from "../database/db.js"
import { Op } from "sequelize"

export const createPrivateChatService = async (user, participant) => {
    const chat = await user.createUserChat({
        isGroup: false
    })
    await chat.addChatParticipants([user, participant])
}

export const createGroupChatService = async (user, chatName) => {
    const chat = await user.createUserChat({
        isGroup: true,
        chatName,
    })
    await chat.addChatParticipants([user])
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

export const getGroupChatNameExists = async (chatName) => {
    return await db.chats.findOne({ where: { chatName, isGroup: true } }) ? true : false
}

export const getUserIsChatCreator = async (userId, chatId) => {
    return await db.chats.findOne({
        where: {
            id: chatId,
            creatorId: userId
        }
    }) ? true : false
}

export const addGroupChatParticipant = async (chat, participant) => {
    await chat.addChatParticipants([participant])
}