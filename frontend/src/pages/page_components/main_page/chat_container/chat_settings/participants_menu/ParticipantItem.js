import styles from "./ParticipantItem.module.css"
import { ReactComponent as UserIcon } from "../../../../../../lib/icons/userIcon.svg"
import { useContext } from 'react'
import { SelectedChatContext } from "../../../../../../contexts/SelectedChatContext.js"
import { UserInfoContext } from "../../../../../../contexts/UserInfoContext.js"
import RemoveParticipantMenu from "./RemoveParticipantMenu.js"

const ParticipantItem = ({ userId, username, onlineUserIds }) => {

    const { userInfoState } = useContext(UserInfoContext)
    const { selectedChatState } = useContext(SelectedChatContext)

    const showRemoveParticipantMenu = userInfoState.id === selectedChatState.creatorId

    return (
        <div className={styles.mainContainer}>
            <div className={styles.contentContainer}>
                <div className={styles.userInfoContainer}>
                    <div className={styles.userIconContainer}>
                        <UserIcon fill={"white"} />
                        <div className={styles.onlineStatusCircle}
                            user-online={onlineUserIds.find(id => id === userId) ? "true" : "false"}></div>
                    </div>
                    <p className={styles.username}>
                        {username}
                    </p>
                </div>
                {showRemoveParticipantMenu && <RemoveParticipantMenu participantId={userId} chatId={selectedChatState.id} />}
            </div>
        </div>
    )
}

export default ParticipantItem