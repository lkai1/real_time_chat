import styles from "./ParticipantItem.module.css"
import { ReactComponent as UserIcon } from "../../../../../../lib/icons/userIcon.svg"

const ParticipantItem = ({ userId, username, onlineUserIds }) => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.contentContainer}>
                <div className={styles.userIconContainer}>
                    <UserIcon fill={"white"} />
                    <div className={styles.onlineStatusCircle}
                        user-online={onlineUserIds.find(id => id === userId) ? "true" : "false"}></div>
                </div>
                <p className={styles.username}>
                    {username}
                </p>
            </div>
        </div>
    )
}

export default ParticipantItem