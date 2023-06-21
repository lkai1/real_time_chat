import styles from "./ChatList.module.css"
import ChatItem from "./ChatItem.js"
import { v4 as uuidv4 } from 'uuid'

const ChatList = ({ chats, loading }) => {

    return (
        <div className={styles.mainContainer}>
            {!loading &&
                chats.map((chat, i) => {
                    return <ChatItem
                        key={uuidv4()}
                        chat={chat.Chat}
                        isFirst={i === 0}
                        isLast={i === chats.length - 1}
                    />
                })
            }
        </div>
    )
}

export default ChatList

