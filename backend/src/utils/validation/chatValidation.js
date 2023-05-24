
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