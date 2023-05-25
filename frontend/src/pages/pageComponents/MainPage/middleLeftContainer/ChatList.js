import { useEffect, useState } from "react"
import { getUserChatsService } from "../../../../services/chatServices"
import styles from "./ChatList.module.css"
import ChatItem from "./ChatItem"
import { v4 as uuidv4 } from 'uuid'

const ChatList = () => {

    const [chatsState, setChatsState] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            const chats = await getUserChatsService()
            setChatsState(chats)
            setLoading(false)
        }
        getData()
    }, [])

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

