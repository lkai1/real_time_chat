import { Sequelize } from "sequelize"
import env_vars from '../config/environment_variables.js'

const db = new Sequelize(`${env_vars.DATABASE_CONNECTION_STRING}`, { logging: false })

export default db

