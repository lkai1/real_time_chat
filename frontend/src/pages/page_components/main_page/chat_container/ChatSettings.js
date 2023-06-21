import styles from "./ChatSettings.module.css"
import { useContext } from "react"
import AddParticipantMenu from "./chat_settings/AddParticipantMenu.js"
import { SelectedChatContext } from "../../../../contexts/SelectedChatContext.js"
import { UserInfoContext } from "../../../../contexts/UserInfoContext.js"
import ParticipantsMenu from "./chat_settings/participants_menu/ParticipantsMenu.js"
import MoreSettingsMenu from "./chat_settings/more_settings_menu/MoreSettingsMenu.js"
import { ReactComponent as ArrowLeftIcon } from "../../../../lib/icons/arrowLeftIcon.svg"

const ChatSettingButtons = () => {

    const { selectedChatState, emptySelectedChatState } = useContext(SelectedChatContext)

    const { userInfoState } = useContext(UserInfoContext)

    const showAddParticipantMenu = (selectedChatState.isGroup && userInfoState.id === selectedChatState.creatorId) ? true : false

    return (
        <div className={styles.mainContainer}>
            <div className={styles.contentContainer}>
                <div className={styles.leftContainer}>
                    <button
                        type="button"
                        className={styles.toChatListButton}
                        onClick={() => { emptySelectedChatState() }}
                    >
                        <ArrowLeftIcon fill={"rgb(20, 20, 20)"} />
                    </button>

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