import styles from "./ChatSettings.module.css"
import { useContext } from "react"
import AddParticipantMenu from "./chatSettings/AddParticipantMenu.js"
import { SelectedChatContext } from "../../../../Contexts/SelectedChatContext.js"
import { UserInfoContext } from "../../../../Contexts/UserInfoContext.js"
import ParticipantsMenu from "./chatSettings/participantsMenu/ParticipantsMenu.js"
import MoreSettingsMenu from "./chatSettings/moreSettingsMenu/MoreSettingsMenu.js"

const ChatSettingButtons = () => {

    const { selectedChatState } = useContext(SelectedChatContext)

    const { userInfoState } = useContext(UserInfoContext)

    const showAddParticipantMenu = (selectedChatState.isGroup && userInfoState.id === selectedChatState.creatorId) ? true : false

    return (
        <div className={styles.mainContainer}>
            <div className={styles.contentContainer}>
                <div className={styles.leftContainer}>
                    {showAddParticipantMenu && <AddParticipantMenu />}
                    <ParticipantsMenu />
                </div>
                <div className={styles.rightContainer}>
                    <MoreSettingsMenu />
                </div>
            </div>
        </div>
    )
}

export default ChatSettingButtons