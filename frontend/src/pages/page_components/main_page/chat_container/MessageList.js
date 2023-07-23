import { useContext, useEffect, useState, useRef } from "react"
import styles from "./MessageList.module.css"
import { SelectedChatContext } from "../../../../contexts/SelectedChatContext.js"
import { v4 as uuidv4 } from "uuid"
import { UserInfoContext } from "../../../../contexts/UserInfoContext.js"
import { getTimestampStringFromISODateTime } from "../../../../utils/timestamp.js"
import DeleteMessageMenu from "./message_list/DeleteMessageMenu.js"
import { getUnreadMessagesAmountInChatService } from "../../../../services/chatServices.js"
import Linkify from "linkify-react"
import { setTabInfoNoNewMessages } from "../../../../utils/tabInfo"

const MessageList = () => {

    const { selectedChatState } = useContext(SelectedChatContext)
    const { userInfoState } = useContext(UserInfoContext)
    const [onHoverMessage, setOnHoverMessage] = useState("")
    const [messageListItemsState, setMessageListItemsState] = useState([])
    const [messageListContainerState, setMessageListContainerState] = useState(undefined)
    const [unreadMessagesAmountState, setUnreadMessagesAmountState] = useState(0)
    const scrolledToFirstUnreadMessageElementRef = useRef(false)
    const firstUnreadMessageElementRef = useRef(undefined)
    const messageListRef = useRef(undefined)


    useEffect(() => {
        const handleOnRenderEvents = async () => {
            const unreadMessagesAmount = await getUnreadMessagesAmountInChatService(selectedChatState.id)
            setUnreadMessagesAmountState(unreadMessagesAmount.data)
        }

        handleOnRenderEvents()
    }, [selectedChatState.id])

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

    useEffect(() => {

        const handleCreateMessageItemsList = () => {
            const messageItemsList = []
            for (let i = 0; i < selectedChatState.messages.length; i++) {
                const message = selectedChatState.messages[i]
                const messageElement = <div
                    key={uuidv4()}
                    ref={(i === selectedChatState.messages.length - unreadMessagesAmountState) ? firstUnreadMessageElementRef : null}
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
                            <Linkify as="span" options={{
                                target: "_blank",
                                rel: "noopener noreferrer"
                            }}>
                                {message.value}
                            </Linkify>
                        </p>
                    </div>
                </div>

                if (i === selectedChatState.messages.length - unreadMessagesAmountState) {
                    messageItemsList.push(<p key={uuidv4()} className={styles.newMessagesInfoText}>{`${unreadMessagesAmountState} uutta viestiä`}</p>)
                }
                messageItemsList.push(messageElement)
            }
            setMessageListItemsState([...messageItemsList].reverse())
        }
        handleCreateMessageItemsList()

    }, [onHoverMessage, selectedChatState.id, selectedChatState.messages, unreadMessagesAmountState, userInfoState.id])

    useEffect(() => {
        const handleCreateMessageListContainer = () => {
            setMessageListContainerState(
                <div className={styles.messageListContainer}
                    ref={messageListRef}
                    onClick={async () => {
                        setUnreadMessagesAmountState(0)
                        setTabInfoNoNewMessages()
                    }}
                >
                    {messageListItemsState}
                </div>
            )
        }
        handleCreateMessageListContainer()
    }, [messageListItemsState, selectedChatState.id, unreadMessagesAmountState])


    if (
        firstUnreadMessageElementRef.current
        && !scrolledToFirstUnreadMessageElementRef.current
        && unreadMessagesAmountState
    ) {
        firstUnreadMessageElementRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
        scrolledToFirstUnreadMessageElementRef.current = true
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
                messageListContainerState
            }
        </div>
    )
}

export default MessageList