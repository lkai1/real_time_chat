import styles from "./ChatItem.module.css"
import { UserInfoContext } from "../../../../contexts/UserInfoContext.js"
import { useContext } from "react"
import { ReactComponent as GroupIcon } from "../../../../lib/icons/groupIcon.svg"
import { ReactComponent as UserIcon } from "../../../../lib/icons/userIcon.svg"
import { SelectedChatContext } from "../../../../contexts/SelectedChatContext.js"
import { SocketContext } from "../../../../contexts/SocketContext.js"

const ChatItem = ({ chat, isFirst, isLast }) => {

    const { userInfoState, userInfoLoading } = useContext(UserInfoContext)
    const { updateSelectedChatState } = useContext(SelectedChatContext)
    const { socket, onlineUserIds } = useContext(SocketContext)

    const getChatTitle = (chat, userInfoState, userInfoLoading) => {
        if (userInfoLoading) return ""
        if (chat.isGroup) return chat.chatName

        return chat.chatParticipants?.find((participant) => {
            return participant.username !== userInfoState.username
        })?.username
    }

    const chatType = chat.isGroup ? "Ryhmä" : "Yksityinen"
    const chatIcon = chat.isGroup ? <GroupIcon fill={"white"} /> : <UserIcon fill={"white"} />

    const chatHasOtherOnlineUsers = chat.chatParticipants.find((participant) => {
        return userInfoState.id !== participant.id && onlineUserIds.includes(participant.id)
    })

    return (
        <div className={styles.mainContainer}
            onClick={() => {
                socket.emit("selectChat", { chatId: chat.id })
                updateSelectedChatState(chat)
            }}
            is-first={isFirst.toString()}
            is-last={isLast.toString()}
        >
            <div className={styles.chatIconContainer}>
                {chatIcon}
                <div className={styles.onlineStatusCircle}
                    user-online={chatHasOtherOnlineUsers ? "true" : "false"}></div>
            </div>
            <div className={styles.typeAndTitleTextContainer}>
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