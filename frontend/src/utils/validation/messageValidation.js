

export const validateChatId = (chatId) => {
    return (
        chatId
        && typeof chatId === "string"
        && chatId.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    ) ? true : false
}

export const validateMessage = (message) => {
    return (
        message
        && typeof message === "string"
    ) ? true : false
}