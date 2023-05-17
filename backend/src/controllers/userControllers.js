import { getUserFromJWTService } from "../services/userServices.js"

export const getUserInfoFromJWTController = async (request, response) => {
    try {

        const token = request.headers.authorization
        if (!token) return response.status(401).send("Access denied!")

        try {
            const user = await getUserFromJWTService(token)
            response.status(200).json(user)
        } catch (e) {
            response.status(400).send("Invalid token!")
        }

    } catch (_error) {
        response.status(500).send("Something went wrong! Try again later.")
    }
}