import styles from "./ChatsContainer.module.css"
import ChatList from "./ChatList.js"
import CreateNewChatModal from "./CreateNewChatModal.js"
import { useState, useContext, useEffect } from "react"
import { ReactComponent as AddIcon } from "../../../../lib/icons/addIcon.svg"
import { getUserChatsService } from "../../../../services/chatServices"
import { SocketContext } from "../../../../contexts/SocketContext"

const ChatsContainer = () => {

    const [showCreateNewChatModal, setShowCreateNewChatModal] = useState(false)
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(true)
    const { updateChatList } = useContext(SocketContext)

    useEffect(() => {
        const getData = async () => {
            const chats = await getUserChatsService()
            setChats(chats)
            setLoading(false)
        }
        getData()
    }, [updateChatList])


    return (
        <div className={styles.mainContainer}>
            {!chats[0] && !loading ?
                <div className={styles.noChatsContainer}>
                    <p className={styles.noChatsText}>
                        Sinulla ei ole keskusteluja
                    </p>
                </div>
                :
                <ChatList chats={chats} loading={loading} />
            }
            <div className={styles.bottomButtonsContainer}>
                <button className={styles.addChatButton}
                    type="button"
                    onClick={() => { setShowCreateNewChatModal(true) }}
                >
                    <AddIcon fill={"white"} heigth={"30px"} width={"30px"} />
                    <p>Luo uusi keskustelu</p>
                </button>
            </div>
            <CreateNewChatModal
                isShown={showCreateNewChatModal}
                setIsShown={setShowCreateNewChatModal}
            />
        </div>
    )
}

export default ChatsContainer