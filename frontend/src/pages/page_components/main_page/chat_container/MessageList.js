import { useContext, useState } from "react"
import styles from "./MessageList.module.css"
import { SelectedChatContext } from "../../../../contexts/SelectedChatContext.js"
import { v4 as uuidv4 } from "uuid"
import { UserInfoContext } from "../../../../contexts/UserInfoContext.js"
import { getTimestampStringFromISODateTime } from "../../../../utils/timestamp.js"
import DeleteMessageMenu from "./message_list/DeleteMessageMenu.js"

const MessageList = () => {

    const { selectedChatState } = useContext(SelectedChatContext)
    const { userInfoState } = useContext(UserInfoContext)
    const [onHoverMessage, setOnHoverMessage] = useState("")

    const UsernameAndTimestamp = ({ message }) => {
        return (
            userInfoState.id === message.messageCreator.id ?
                <div className={styles.userUsernameAndTimestampContainer}>
                    <p className={styles.timestamp}>{getTimestampStringFromISODateTime(message.timestamp)}</p>
                    <p className={styles.userUsernameText}>
                        {message.messageCreator.username}
                    </p>
                </div>
                :
                <div className={styles.usernameAndTimestampContainer}>
                    <p className={styles.usernameText}>
                        {message.messageCreator.username}
                    </p>
                    <p className={styles.timestamp}>{getTimestampStringFromISODateTime(message.timestamp)}</p>
                </div>
        )
    }

    return (
        <div className={styles.mainContainer}>
            {!selectedChatState.messages?.[0] ?
                <div className={styles.noMessagesContainer}>
                    <p className={styles.noMessagesText}>
                        Ei viestejä vielä
                    </p>
                </div>
                :
                <div className={styles.messageListContainer}>
                    {[...selectedChatState.messages].reverse().map((message) => {
                        return (
                            <div
                                key={uuidv4()}
                                className={userInfoState.id === message.messageCreator.id ? styles.userMessageContainer : styles.messageContainer}
                                onMouseEnter={(event) => {
                                    event.preventDefault()
                                    setOnHoverMessage(message.id)
                                }}
                                onMouseLeave={(event) => {
                                    event.preventDefault()
                                    setOnHoverMessage("")
                                }}
                            >
                                <div className={userInfoState.id === message.messageCreator.id ? styles.userMessageContainer : styles.messageContainer}>
                                    <div className={styles.messageTopContainer}>
                                        {userInfoState.id === message.messageCreator.id && <DeleteMessageMenu messageId={message.id} chatId={selectedChatState.id} isHovered={onHoverMessage === message.id} />}
                                        <UsernameAndTimestamp message={message} />
                                    </div>
                                    <p className={userInfoState.id === message.messageCreator.id ? styles.userMessageText : styles.messageText}>
                                        {message.value}
                                    </p>
                                </div>
                            </div>
                        )
                    })}

                </div>
            }
        </div>
    )
}

export default MessageList