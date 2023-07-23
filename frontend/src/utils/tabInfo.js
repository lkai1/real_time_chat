
export const setTabInfoNewMessages = () => {
    const element = document.getElementById("tab-info")
    element.innerHTML = "(new messages) FLIERCHAT"
}

export const setTabInfoNoNewMessages = () => {
    const element = document.getElementById("tab-info")
    element.innerHTML = "FLIERCHAT"
}