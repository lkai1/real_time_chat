import { SelectedChatContext } from "../../../../Contexts/SelectedChatContext"
import MessageList from "./MessageList"
import styles from "./MiddleRightContainer.module.css"
import { useContext, useState } from "react"
import { createMessageService } from "../../../../services/messageServices"

const MiddleRightContainer = () => {

    const [message, setMessage] = useState("")
    const { selectedChatState } = useContext(SelectedChatContext)

    const handleFormSubmit = async (event, chatId, message, setMessage) => {
        event.preventDefault()
        await createMessageService(chatId, message)
        setMessage("")
    }

    return (
        <div className={styles.mainContainer}>
            <MessageList />
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