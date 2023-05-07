export const validateUsername = (username) => {
    return (
        username
        && typeof username === "string"
        && username.match(/^[0-9a-zA-Z]{3,30}$/)
    ) ? true : false
}

export const validatePassword = (password) => {
    return (
        password
        && typeof password === "string"
        && password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/)
    ) ? true : false
}