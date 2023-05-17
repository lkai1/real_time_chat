import db from "../database/db.js"
import jwt from "jsonwebtoken"

export const getUserFromJWTService = async (token) => {
    const decodedJWT = jwt.decode(token)
    return await db.users.findOne({ where: { id: decodedJWT.id }, attributes: ["id", "username"] })
}

export const getUserFromIdService = async (userId) => {
    return await db.users.findOne({ where: { id: userId }, attributes: ["id", "username"] })
}

export const createUserService = async (username, hash) => {
    return await db.users.create({ username, hash })
}

export const getUsernameExists = async (username) => {
    return await db.users.findOne({ where: { username } }) ? true : false
}