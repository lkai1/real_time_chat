import styles from "./ParticipantsMenu.module.css"
import { useState } from "react"
import { ReactComponent as CloseIcon } from "../../../../../../lib/icons/closeIcon.svg"
import { ReactComponent as GroupIcon } from "../../../../../../lib/icons/groupIcon.svg"
import ParticipantList from "./ParticipantList.js"

const ParticipantsMenu = () => {
    const [isMenuShown, setIsMenuShown] = useState(false)

    return (
        <div className={styles.mainContainer}>
            <button className={styles.openMenuButton}
                type="button"
                onClick={() => { setIsMenuShown(!isMenuShown) }}
                title="Lisää käyttäjä"
            >
                <GroupIcon fill={"rgb(20, 20, 20)"} />
            </button>
            <div className={isMenuShown ? styles.menuContainer : styles.hiddenMenuContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.topContainer}>
                        <p className={styles.topTitle}>Käyttäjälista</p>
                        <button className={styles.closeButton}
                            type="button"
                            onClick={() => { setIsMenuShown(false) }}
                        >
                            <CloseIcon fill={"rgb(70, 70, 70)"} />
                        </button>
                    </div>
                    <div className="participantListContainer">
                        <ParticipantList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParticipantsMenu