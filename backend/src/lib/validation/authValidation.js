
const validateUsername = (username) => {
    return (
        username
        && typeof username === "string"
        && username.match(/^[0-9a-zA-Z]{3,30}$/)
    ) ? true : false
}

const validatePassword = (password) => {
    return (
        password
        && typeof password === "string"
        && password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/)
    ) ? true : false
}

export const validateRegisterObj = (registerObj) => {
    return (
        registerObj
        && typeof registerObj === "object"
        && Object.keys(registerObj).length === 3
        && validateUsername(registerObj.username)
        && validatePassword(registerObj.password)
        && registerObj.password === registerObj.password2
    ) ? true : false
}

export const validateLoginObj = (loginObj) => {
    return (
        loginObj
        && typeof loginObj === "object"
        && Object.keys(loginObj).length === 2
        && validateUsername(loginObj.username)
        && validatePassword(loginObj.password)
    ) ? true : false
}