import db from '../db.js'
import { DataTypes } from 'sequelize'

const User = db.define("User", {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default User