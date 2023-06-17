import { SelectedChatContext } from "../../../../Contexts/SelectedChatContext.js"
import MessageList from "./MessageList.js"
import styles from "./MiddleRightContainer.module.css"
import { useContext, useState } from "react"
import { createMessageService } from "../../../../services/messageServices.js"
import ChatSettings from "./ChatSettings.js"
import { SocketContext } from "../../../../Contexts/SocketContext.js"

const MiddleRightContainer = () => {

    const [message, setMessage] = useState("")
    const { selectedChatState } = useContext(SelectedChatContext)
    const { socket } = useContext(SocketContext)
    const [notification, setNotification] = useState("")

    const handleFormSubmit = async (event, chatId, message, setMessage) => {
        event.preventDefault()
        const result = await createMessageService(chatId, message)
        if (result.success) {
            socket.emit("message", {
                message: result.message,
                chatId
            })
        } else { setNotification(result.message) }
        setMessage("")
    }

    return (
        <div className={
            notification ?
                styles.mainContainerWithNotificationShown
                : styles.mainContainer}>
            {selectedChatState.id && <ChatSettings />}
            <MessageList />
            <p className={notification ? styles.notificationShown : styles.notification}>{notification}</p>
            {selectedChatState.id &&
                <form
                    onSubmit={(event) => {
                        handleFormSubmit(event, selectedChatState.id, message, setMessage)
                    }}
                >
                    <div className={styles.createMessageFormContentContainer}>
                        <input
                            className={styles.messageInput}
                            placeholder="Kirjoita viesti..."
                            value={message}
                            onChange={(event) => {
                                setMessage(event.target.value)
                            }}
                        />
                        <button
                            className={styles.sendMessageButton}
                            type="submit"
                        >
                            Lähetä
                        </button>
                    </div>
                </form>
            }
        </div>
    )
}

export default MiddleRightContainer