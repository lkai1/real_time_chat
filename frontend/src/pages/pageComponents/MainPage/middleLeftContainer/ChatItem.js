import styles from "./ChatItem.module.css"
import { UserInfoContext } from "../../../../Contexts/UserInfoContext.js"
import { useContext } from "react"
import { ReactComponent as GroupIcon } from "../../../../lib/icons/groupIcon.svg"
import { ReactComponent as UserIcon } from "../../../../lib/icons/userIcon.svg"
import { SelectedChatContext } from "../../../../Contexts/SelectedChatContext.js"
import { SocketContext } from "../../../../Contexts/SocketContext.js"

const ChatItem = ({ chat }) => {

    const { userInfoState, userInfoLoading } = useContext(UserInfoContext)
    const { selectedChatState, updateSelectedChatState } = useContext(SelectedChatContext)
    const { socket } = useContext(SocketContext)

    const getChatTitle = (chat, userInfoState, userInfoLoading) => {
        if (userInfoLoading) return ""
        if (chat.isGroup) return chat.chatName

        return chat.chatParticipants?.find((participant) => {
            return participant.username !== userInfoState.username
        })?.username
    }

    const chatType = chat.isGroup ? "Ryhmä" : "Yksityinen"
    const chatIcon = chat.isGroup ? <GroupIcon fill={"white"} /> : <UserIcon fill={"white"} />

    return (
        <div className={styles.mainContainer}
            onClick={() => {
                socket.emit("selectChat", { chatId: chat.id })
                updateSelectedChatState(chat)
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