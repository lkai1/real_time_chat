import styles from "./RemoveParticipantMenu.module.css"
import { ReactComponent as DeleteIcon } from "../../../../../../lib/icons/deleteIcon.svg"
import { ReactComponent as CloseIcon } from "../../../../../../lib/icons/closeIcon.svg"
import { useContext, useState } from "react"
import { removeChatParticipantService } from "../../../../../../services/chatServices.js"
import { SocketContext } from "../../../../../../Contexts/SocketContext.js"

const RemoveParticipantMenu = ({ participantId, chatId }) => {

    const [isMenuShown, setIsMenuShown] = useState(false)
    const [notification, setNotification] = useState("")
    const { socket } = useContext(SocketContext)

    const handleRemoveParticipantClick = async (chatId, participantId) => {
        const result = await removeChatParticipantService(chatId, participantId)
        if (result.success) {
            socket.emit("chatParticipantRemove", { chatId, participantId })
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
                <div className={styles.openMenuButtonIcon}>
                    <div className={styles.iconContainer}>
                        <DeleteIcon fill={"rgb(255, 50, 50)"} />
                    </div>
                </div>
            </button>
            <div className={isMenuShown ? styles.menuContainer : styles.hiddenMenuContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.topContainer}>
                        <p className={styles.topTitle}>Poistetaanko käyttäjä keskustelusta?</p>
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
                        onClick={() => { handleRemoveParticipantClick(chatId, participantId) }}
                    >
                        Vahvista
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RemoveParticipantMenu