import styles from "./ChatItem.module.css"
import { UserInfoContext } from "../../../../Contexts/UserInfoContext.js"
import { useContext } from "react"
import { ReactComponent as GroupIcon } from "../../../../lib/icons/groupIcon.svg"
import { ReactComponent as UserIcon } from "../../../../lib/icons/userIcon.svg"
import { SelectedChatContext } from "../../../../Contexts/SelectedChatContext.js"

const ChatItem = ({ chat }) => {

    const { userInfoState, userInfoLoading } = useContext(UserInfoContext)
    const { selectedChatState, setSelectedChatState } = useContext(SelectedChatContext)

    const getChatTitle = (chat, userInfoState, userInfoLoading) => {
        if (userInfoLoading) return ""
        if (chat.isGroup) return chat.chatName

        return chat.chatParticipants?.find((participant) => {
            return participant.username !== userInfoState.username
        }).username
    }

    const chatType = chat.isGroup ? "Ryhmä" : "Yksityinen"
    const chatIcon = chat.isGroup ? <GroupIcon fill={"white"} /> : <UserIcon fill={"white"} />

    return (
        <div className={styles.mainContainer}
            onClick={() => {
                setSelectedChatState(chat)
            }}>
            <div className={selectedChatState.id === chat.id ? styles.selectedChatIconContainer : styles.chatIconContainer}>
                {chatIcon}
            </div>
            <div>
                <p className={styles.typeText}>
                    {chatType}
                </p>
                <p className={styles.titleText}>
                    {getChatTitle(chat, userInfoState, userInfoLoading)}
                </p>
            </div>
        </div >
    )
}

export default ChatItem