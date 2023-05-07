

export const getAuthToken = () => {
    return document.cookie.split("; ").find((row) => row.startsWith("auth-token"))?.split("=")[1]
}

export const setAuthToken = (token) => {
    document.cookie = `auth-token=${token};`
}

export const clearAuthToken = () => {
    document.cookie = "auth-token=; expires=-1; path=/;";
}
