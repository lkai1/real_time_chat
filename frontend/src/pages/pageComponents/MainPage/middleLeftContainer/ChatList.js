import { useContext, useEffect, useState } from "react"
import { getUserChatsService } from "../../../../services/chatServices.js"
import styles from "./ChatList.module.css"
import ChatItem from "./ChatItem.js"
import { v4 as uuidv4 } from 'uuid'
import { SocketContext } from "../../../../Contexts/SocketContext.js"

const ChatList = () => {

    const [chatsState, setChatsState] = useState([])
    const [loading, setLoading] = useState(true)
    const { updateChatList } = useContext(SocketContext)

    useEffect(() => {
        const getData = async () => {
            const chats = await getUserChatsService()
            setChatsState(chats)
            setLoading(false)
        }
        getData()
    }, [updateChatList])

    return (
        <div className={styles.mainContainer}>
            {!loading &&
                chatsState.map((chat) => {
                    return <ChatItem
                        key={uuidv4()}
                        chat={chat.Chat}
                    />
                })
            }
        </div>
    )
}

export default ChatList

