import jwt from "jsonwebtoken"
import User from "../database/models/User.js"

export const getUserInfoFromJWT = async (request, response) => {
    try {

        const token = request.headers.authorization
        if (!token) return response.status(401).send("Access denied!")

        try {
            const decodedJWT = jwt.decode(token)
            const user = await User.findOne({ where: { id: decodedJWT.id } })
            response.status(200).json({ username: user.username })
        } catch (e) {
            response.status(400).send("Invalid token!")
        }

    } catch (_error) {
        response.status(500).send("Something went wrong! Try again later.")
    }
}