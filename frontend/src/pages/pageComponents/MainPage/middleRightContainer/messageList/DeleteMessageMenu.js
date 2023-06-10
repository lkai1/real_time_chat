import styles from "./DeleteMessageMenu.module.css"
import { ReactComponent as DeleteIcon } from "../../../../../lib/icons/deleteIcon.svg"
import { deleteUserMessageService } from "../../../../../services/messageServices"
import { ReactComponent as CloseIcon } from "../../../../../lib/icons/closeIcon.svg"
import { useState } from "react"

const DeleteMessageMenu = ({ messageId }) => {

    const [isMenuShown, setIsMenuShown] = useState(false)
    const [notification, setNotification] = useState("")

    const handleDeleteMessageClick = async (messageId) => {
        const result = await deleteUserMessageService(messageId)
        if (result.success) {
            setIsMenuShown(false)
        } else {
            setNotification(result.message)
        }
    }

    return (
        <div>
            <button className={styles.openMenuButton}
                type="button"
                onClick={() => { setIsMenuShown(!isMenuShown) }}
            >
                <div className={styles.iconContainer}>
                    <DeleteIcon fill={"rgb(255, 50, 50)"} />
                </div>
            </button>
            <div className={isMenuShown ? styles.menuContainer : styles.hiddenMenuContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.topContainer}>
                        <p className={styles.topTitle}>Poistetaanko viesti?</p>
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
                        onClick={() => { handleDeleteMessageClick(messageId) }}
                    >
                        Vahvista
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteMessageMenu