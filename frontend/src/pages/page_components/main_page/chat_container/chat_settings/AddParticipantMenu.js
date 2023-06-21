import styles from "./AddParticipantMenu.module.css"
import { useContext, useState } from "react"
import { ReactComponent as AddIcon } from "../../../../../lib/icons/addIcon.svg"
import { ReactComponent as CloseIcon } from "../../../../../lib/icons/closeIcon.svg"
import { UserInfoContext } from "../../../../../contexts/UserInfoContext.js"
import { SelectedChatContext } from "../../../../../contexts/SelectedChatContext.js"
import { addGroupChatParticipantService } from "../../../../../services/chatServices.js"
import { SocketContext } from "../../../../../contexts/SocketContext.js"

const AddParticipantMenu = () => {
    const [isMenuShown, setIsMenuShown] = useState(false)
    const [toAddUsername, setToAddUsername] = useState("")
    const [notification, setNotification] = useState({ value: "", color: 1 })

    const { userInfoState } = useContext(UserInfoContext)
    const { selectedChatState } = useContext(SelectedChatContext)
    const { socket } = useContext(SocketContext)

    const showMainContainer = (selectedChatState.isGroup && userInfoState.id === selectedChatState.creatorId) ? true : false

    const handleAddUserClick = async (chatId, username, setNotification) => {
        const result = await addGroupChatParticipantService(chatId, username)
        if (result.success) socket.emit("chatParticipantAdd", { chatId, participantId: result.data })
        setNotification({ value: result.message, color: result.success ? 1 : 2 })
    }

    return (
        <div className={showMainContainer ? styles.mainContainer : styles.hiddenMainContainer}>
            <button className={styles.openMenuButton}
                type="button"
                onClick={() => { setIsMenuShown(!isMenuShown) }}
                title="Lisää käyttäjä"
            >
                <AddIcon fill={"rgb(20, 20, 20)"} />
            </button>
            <div className={isMenuShown ? styles.menuContainer : styles.hiddenMenuContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.topContainer}>
                        <p className={styles.topTitle}>Lisää käyttäjä</p>
                        <button className={styles.closeButton}
                            type="button"
                            onClick={() => { setIsMenuShown(false) }}
                        >
                            <CloseIcon fill={"rgb(70, 70, 70)"} />
                        </button>
                    </div>
                    <p className={notification.color === 1 ? styles.notificationText : styles.notificationErrorText}>{notification.value}</p>
                    <div className={styles.inputFieldAndAddButtonContainer}>
                        <input
                            className={styles.inputField}
                            value={toAddUsername}
                            placeholder="Käyttäjän nimi..."
                            onChange={(event) => { setToAddUsername(event.target.value) }}
                        />
                        <button
                            type="button"
                            className={styles.addButton}
                            onClick={() => {
                                handleAddUserClick(selectedChatState.id, toAddUsername, setNotification)
                            }}
                        >
                            Lisää käyttäjä keskusteluun
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddParticipantMenu