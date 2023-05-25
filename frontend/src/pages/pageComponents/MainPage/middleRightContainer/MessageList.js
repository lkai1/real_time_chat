import { useContext } from "react"
import styles from "./MessageList.module.css"
import { SelectedChatContext } from "../../../../Contexts/SelectedChatContext"
import { v4 as uuidv4 } from "uuid"
import { UserInfoContext } from "../../../../Contexts/UserInfoContext"
import { getTimestampStringFromISODateTime } from "../../../../utils/timestamp"

const MessageList = () => {

    const { selectedChatMessagesState, selectedChatState } = useContext(SelectedChatContext)
    const { userInfoState } = useContext(UserInfoContext)

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
            {!selectedChatMessagesState[0] ?
                <div className={styles.noMessagesContainer}>
                    {!selectedChatState ?
                        <p className={styles.noMessagesText}>
                            Voit avata tai luoda uuden chatin vasemmalta
                        </p>
                        :
                        <p className={styles.noMessagesText}>
                            Ei viestejä vielä
                        </p>
                    }
                </div>
                :
                <div className={styles.messageListContainer}>
                    {[...selectedChatMessagesState].reverse().map((message) => {
                        return (
                            <div
                                key={uuidv4()}
                                className={userInfoState.id === message.messageCreator.id ? styles.userMessageContainer : styles.messageContainer}>
                                <div className={userInfoState.id === message.messageCreator.id ? styles.userMessageContainer : styles.messageContainer}>
                                    <UsernameAndTimestamp message={message} />
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