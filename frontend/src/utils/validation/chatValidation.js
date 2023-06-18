
export const validateUsername = (username) => {
    return (
        username
        && typeof username === "string"
        && username.match(/^[0-9a-zA-Z]{3,30}$/)
    ) ? true : false
}

export const validateChatName = (chatName) => {
    return (
        chatName
        && typeof chatName === "string"
        && chatName.length > 2 && chatName.length < 31
    ) ? true : false
}

export const validateChatId = (chatId) => {
    return (
        chatId
        && typeof chatId === "string"
        && chatId.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    ) ? true : false
}

export const validateChatParticipantId = (participantId) => {
    return (
        participantId
        && typeof participantId === "string"
        && participantId.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    ) ? true : false
}