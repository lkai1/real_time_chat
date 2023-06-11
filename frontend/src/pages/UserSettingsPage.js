import styles from "./UserSettingsPage.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteUserService } from "../services/userServices.js"
import { ReactComponent as DeleteIcon } from "../lib/icons/deleteIcon.svg"
import { ReactComponent as CloseIcon } from "../lib/icons/closeIcon.svg"
import { logoutService } from "../services/authServices.js"
import { ReactComponent as ArrowLeftIcon } from "../lib/icons/arrowLeftIcon.svg"

const UserSettingsPage = () => {

    const [isMenuShown, setIsMenuShown] = useState(false)
    const [notification, setNotification] = useState("")
    const navigate = useNavigate()

    const handleDeleteUserClick = async () => {
        const result = await deleteUserService()
        if (result.success) {
            setIsMenuShown(false)
            logoutService(navigate)
        } else {
            setNotification(result.message)
        }
    }

    return (
        <div className={styles.mainContainer}>
            <button className={styles.navigateToMainPageButton}
                type="button"
                onClick={() => { navigate("/main") }}
            >
                <div className={styles.navigateToMainPageButtonIcon}>
                    <div className={styles.iconContainer}>
                        <ArrowLeftIcon fill={"rgb(0, 153, 255)"} />
                    </div>
                </div>
                <p className={styles.navigateToMainPageButtonText}>Takaisin keskusteluihin</p>
            </button>
            <div className={styles.openDeleteUserMenuButtonContainer}>
                <button className={styles.openMenuButton}
                    type="button"
                    onClick={() => { setIsMenuShown(!isMenuShown) }}
                >
                    <p className={styles.openMenuButtonText}>Poista käyttäjätili</p>
                    <div className={styles.openMenuButtonIcon}>
                        <div className={styles.iconContainer}>
                            <DeleteIcon fill={"white"} />
                        </div>
                    </div>
                </button>
            </div>
            <div className={isMenuShown ? styles.menuContainer : styles.hiddenMenuContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.topContainer}>
                        <p className={styles.topTitle}>Poistetaanko käyttäjätili?</p>
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
                        onClick={() => { handleDeleteUserClick() }}
                    >
                        Vahvista
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserSettingsPage