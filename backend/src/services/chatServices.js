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
            where: {
                [Op.or]: [
                    {
                        userId: userId
                    },
                    {
                        userId: userId2
                    }
                ]
            }
        },
        where: {
            [Op.or]: [
                {
                    creatorId: userId,
                    isGroup: false,
                },
                {
                    creatorId: userId2,
                    isGroup: false,
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