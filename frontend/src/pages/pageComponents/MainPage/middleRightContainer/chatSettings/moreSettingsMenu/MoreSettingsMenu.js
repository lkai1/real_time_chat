import styles from "./MoreSettingsMenu.module.css"
import { ReactComponent as DotsIcon } from "../../../../../../lib/icons/dotsIcon.svg"
import { useState, useContext } from "react"
import DeleteChatMenu from "./DeleteChatMenu.js"
import { SelectedChatContext } from "../../../../../../Contexts/SelectedChatContext.js"
import { UserInfoContext } from "../../../../../../Contexts/UserInfoContext.js"
import DeleteUserMessagesMenu from "./DeleteUserMessagesMenu.js"
import LeaveChatMenu from "./LeaveChatMenu.js"

const MoreSettingsMenu = () => {

    const [isMenuShown, setIsMenuShown] = useState(false)

    const { selectedChatState } = useContext(SelectedChatContext)
    const { userInfoState } = useContext(UserInfoContext)

    const showDeleteChatMenu = selectedChatState.creatorId === userInfoState.id
    const showLeaveChatMenu = userInfoState.id !== selectedChatState.creatorId

    return (
        <div>
            <button className={styles.openMenuButton}
                type="button"
                onClick={() => { setIsMenuShown(!isMenuShown) }}
                title="Lisää valintoja"
            >
                <DotsIcon fill={"rgb(20, 20, 20)"} />
            </button>
            <div className={isMenuShown ? styles.menuContainer : styles.hiddenMenuContainer}>
                <div className={styles.contentContainer}>
                    <DeleteUserMessagesMenu />
                    {showDeleteChatMenu && <DeleteChatMenu />}
                    {showLeaveChatMenu && <LeaveChatMenu />}
                </div>
            </div>
        </div>
    )
}

export default MoreSettingsMenu