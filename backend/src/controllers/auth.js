import bcrypt from "bcryptjs"
import User from "../database/models/User.js"
import jwt from "jsonwebtoken"
import env_vars from "../config/environment_variables.js"
import { validateRegisterObj, validateLoginObj } from "../lib/validation/authValidation.js"

export const register = async (request, response) => {
  try {

    if (!validateRegisterObj(request.body)) return response.status(400).send("Invalid register credentials!")

    const { username, password } = request.body

    const usernameExists = await User.findOne({ where: { username } })
    if (usernameExists) return response.status(403).send("Username is already taken.")

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)


    await User.create({
      username,
      hash
    })
    response.status(201).send("User registered!")

  } catch (_error) {
    response.status(500).send("Something went wrong! Try again later.")
  }
}

export const login = async (request, response) => {
  try {

    if (!validateLoginObj(request.body)) return response.status(400).send("Invalid login credentials!")

    const { username, password } = request.body

    const user = await User.findOne({ where: { username } })
    if (!user) return response.status(400).send("Invalid login credentials!")

    const validPassword = await bcrypt.compare(password, user.hash)
    if (!validPassword) return response.status(400).send("Invalid login credentials!")

    const token = jwt.sign({ id: user.id }, env_vars.TOKEN_SECRET)
    response.header("auth-token", token)

    response.status(200).send("User logged in.")

  } catch (_error) {
    response.status(500).send("Something went wrong! Try again later.")
  }
}

export const verifyJWT = async (request, response, next) => {
  try {

    const token = request.headers.authorization
    if (!token) return response.status(401).send("Access denied!")

    try {
      jwt.verify(token, env_vars.TOKEN_SECRET)
      next()
    } catch (e) {
      response.status(400).send("Invalid token!")
    }

  } catch (_error) {
    response.status(500).send("Something went wrong! Try again later.")
  }
}

export const verifyLogin = async (request, response) => {
  try {

    const token = request.headers.authorization
    if (!token) return response.status(401).send("Access denied!")

    try {
      jwt.verify(token, env_vars.TOKEN_SECRET)
      response.status(200).send("Verified login!")
    } catch (e) {
      response.status(400).send("Invalid token!")
    }

  } catch (_error) {
    response.status(500).send("Something went wrong! Try again later.")
  }
}