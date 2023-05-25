import { SelectedChatContext } from "../../../../Contexts/SelectedChatContext"
import MessageList from "./MessageList"
import styles from "./MiddleRightContainer.module.css"
import { useContext, useState } from "react"
import { createMessageService } from "../../../../services/messageServices"

const MiddleRightContainer = () => {

    const [message, setMessage] = useState("")
    const { selectedChatState } = useContext(SelectedChatContext)
    const [notification, setNotification] = useState("")

    const handleFormSubmit = async (event, chatId, message, setMessage) => {
        event.preventDefault()
        const result = await createMessageService(chatId, message)

        if (!result.success) setNotification(result.message)

        setMessage("")
    }

    return (
        <div className={notification ? styles.mainContainerWithNotificationShown : styles.mainContainer}>
            <MessageList />
            <p className={notification ? styles.notificationShown : styles.notification}>{notification}</p>
            {selectedChatState &&
                <form
                    onSubmit={(event) => {
                        handleFormSubmit(event, selectedChatState, message, setMessage)
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