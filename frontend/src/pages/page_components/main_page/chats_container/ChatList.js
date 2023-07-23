import styles from "./ChatList.module.css"
import ChatItem from "./ChatItem.js"
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from "react"
import { getUnreadMessagesAmountInChatService } from "../../../../services/chatServices"

const ChatList = ({ chats, loading }) => {
    const [chatItems, setChatItems] = useState([])

    useEffect(() => {
        const createChatItems = async () => {
            const chatItemsList = []

            if (chats[0]) {
                for (let i = 0; i < chats.length; i++) {
                    const unreadMessagesAmountInChat = await getUnreadMessagesAmountInChatService(chats[i].Chat.id)

                    chatItemsList.push(
                        <ChatItem
                            key={uuidv4()}
                            chat={chats[i].Chat}
                            unreadMessagesAmount={unreadMessagesAmountInChat.data}
                            isFirst={i === 0}
                            isLast={i === chats.length - 1}
                        />
                    )
                }
                setChatItems(chatItemsList)
            }
        }

        createChatItems()

    }, [chats])

    return (
        <div className={styles.mainContainer}>
            {!loading &&
                chatItems
            }
        </div>
    )
}

export default ChatList

