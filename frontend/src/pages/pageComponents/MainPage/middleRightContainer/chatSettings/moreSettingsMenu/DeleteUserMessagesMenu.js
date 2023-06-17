import styles from "./DeleteUserMessagesMenu.module.css"
import { ReactComponent as DeleteIcon } from "../../../../../../lib/icons/deleteIcon.svg"
import { ReactComponent as CloseIcon } from "../../../../../../lib/icons/closeIcon.svg"
import { useContext, useState } from "react"
import { SelectedChatContext } from "../../../../../../Contexts/SelectedChatContext.js"
import { deleteAllUserMessagesFromChatService } from "../../../../../../services/messageServices.js"
import { SocketContext } from "../../../../../../Contexts/SocketContext.js"

const DeleteUserMessagesMenu = () => {

    const [isMenuShown, setIsMenuShown] = useState(false)
    const [notification, setNotification] = useState("")
    const { selectedChatState } = useContext(SelectedChatContext)
    const { socket } = useContext(SocketContext)

    const handleDeleteAllUserMessagesFromChat = async (chatId) => {
        const result = await deleteAllUserMessagesFromChatService(chatId)
        if (result.success) {
            setIsMenuShown(false)
            socket.emit("messageDeleteAll", { chatId })
        } else {
            setNotification(result.message)
        }
    }

    return (
        <div className={styles.mainContainer}>
            <button className={styles.openMenuButton}
                type="button"
                onClick={() => { setIsMenuShown(!isMenuShown) }}
            >
                <p className={styles.openMenuButtonText}>Poista kaikki viestisi</p>
                <div className={styles.openMenuButtonIcon}>
                    <div className={styles.iconContainer}>
                        <DeleteIcon fill={"rgb(255, 50, 50)"} />
                    </div>
                </div>
            </button>
            <div className={isMenuShown ? styles.menuContainer : styles.hiddenMenuContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.topContainer}>
                        <p className={styles.topTitle}>Poistetaanko kaikki viestisi?</p>
                        <button className={styles.closeButton}
                            type="button"
                            onClick={() => { setIsMenuShown(false) }}
                        >
                            <CloseIcon fill={"rgb(70, 70, 70)"} />
                        </button>
                    </div>
                    <p className={styles.notificationText}>{notification}</p>
                    <button className={styles.deleteButton}
                        type="button"
                        onClick={() => { handleDeleteAllUserMessagesFromChat(selectedChatState.id) }}
                    >
                        Vahvista
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteUserMessagesMenu