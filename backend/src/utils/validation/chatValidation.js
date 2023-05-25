
export const validateCreatePrivateChatParams = (params) => {
    return (
        params
        && typeof params === "object"
        && Object.keys(params).length === 1
        && typeof params.participantUsername === "string"
        && params.participantUsername.length > 2 && params.participantUsername.length < 31
    ) ? true : false
}

export const validateCreateGroupChatParams = (params) => {
    return (
        params
        && typeof params === "object"
        && Object.keys(params).length === 1
        && typeof params.chatName === "string"
        && params.chatName.length > 2 && params.chatName.length < 31
    ) ? true : false
}

export const validateAddGroupChatParticipantParams = (params) => {
    return (
        params
        && typeof params === "object"
        && Object.keys(params).length === 2
        && typeof params.chatId === "string"
        && params.chatId.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
        && typeof params.participantUsername === "string"
        && params.participantUsername.length > 2 && params.participantUsername.length < 31
    ) ? true : false
}