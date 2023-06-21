import styles from "./LeaveChatMenu.module.css"
import { ReactComponent as CloseIcon } from "../../../../../../lib/icons/closeIcon.svg"
import { useContext, useState } from "react"
import { SelectedChatContext } from "../../../../../../contexts/SelectedChatContext.js"
import { removeChatParticipantService } from "../../../../../../services/chatServices.js"
import { SocketContext } from "../../../../../../contexts/SocketContext.js"
import { UserInfoContext } from "../../../../../../contexts/UserInfoContext.js"

const LeaveChatMenu = () => {

    const [isMenuShown, setIsMenuShown] = useState(false)
    const [notification, setNotification] = useState("")
    const { selectedChatState } = useContext(SelectedChatContext)
    const { userInfoState } = useContext(UserInfoContext)
    const { socket } = useContext(SocketContext)

    const handleLeaveChatClick = async (chatId, userId) => {
        const result = await removeChatParticipantService(chatId, userId)
        if (result.success) {
            socket.emit("emptySelectedChat")
            socket.emit("chatParticipantRemove", { chatId, participantId: userId })
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
                <p className={styles.openMenuButtonText}>Poistu keskustelusta</p>
            </button>
            <div className={isMenuShown ? styles.menuContainer : styles.hiddenMenuContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.topContainer}>
                        <p className={styles.topTitle}>Poistutaanko keskustelusta?</p>
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
                        onClick={() => { handleLeaveChatClick(selectedChatState.id, userInfoState.id) }}
                    >
                        Vahvista
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LeaveChatMenu