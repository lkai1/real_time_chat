import bcrypt from "bcryptjs"
import User from "../database/models/User.js"
import jwt from "jsonwebtoken"
import env_vars from "../config/environment_variables.js"

export const register = async (request, response) => {
  const { username, password } = request.body
  console.log(username, password)
  if (!username || !password) return response.status(400).send("Invalid username or password!")

  const usernameExists = await User.findOne({ where: { username: username } })
  if (usernameExists) return response.status(400).send("Username is already taken.")

  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)

  try {
    await User.create({
      username,
      hash: passwordHash
    })
    response.status(201).send("User registered!")
  } catch (_error) {
    response.status(500).send("Something went wrong!")
  }
}

export const login = async (request, response) => {
  const { username, password } = request.body

  if (!username || !password) return response.status(400).send("Invalid username or password!")

  const user = await User.findOne({ where: { username } })
  if (!user) return response.status(400).send("Invalid username or password!")

  const validPassword = await bcrypt.compare(password, user.hash)
  if (!validPassword) return response.status(400).send("Invalid username or password!")

  const token = jwt.sign({ id: user.id }, env_vars.TOKEN_SECRET)
  response.header("auth-token", token)

  response.status(200).send("User logged in.")
}

export const verifyJWT = async (request, response, next) => {
  const token = request.headers.authorization
  if (!token) return response.status(401).send("Access denied!")

  try {
    jwt.verify(token, env_vars.TOKEN_SECRET)
    next()
  } catch (e) {
    response.status(400).send("Invalid token!")
  }
}

