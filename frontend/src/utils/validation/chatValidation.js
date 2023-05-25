
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