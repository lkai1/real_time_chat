import { DataTypes } from "sequelize"

const ChatParticipant = (sequelize) => {
    return sequelize.define("ChatParticipant", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true
        },
    }, { timestamps: false })
}

export default ChatParticipant
