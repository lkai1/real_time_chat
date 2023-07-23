

export const getAuthToken = () => {
    return document.cookie.split("; ").find((row) => row.startsWith("auth-token"))?.split("=")[1]
}

export const setAuthToken = (token) => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    const expiresIn = date.toUTCString()
    document.cookie = `auth-token=${token}; expires=${expiresIn}`
}

export const clearAuthToken = () => {
    document.cookie = "auth-token=; expires=-1; path=/;";
}
