import styles from "./MainPage.module.css"
import TopContainer from "./page_components/main_page/top_container/TopContainer.js"
import ChatsContainer from "./page_components/main_page/chats_container/ChatsContainer.js"
import ChatContainer from "./page_components/main_page/chat_container/ChatContainer.js"
import { useContext } from "react"
import { SelectedChatContext } from "../contexts/SelectedChatContext.js"

const MainPage = () => {

    const { selectedChatState } = useContext(SelectedChatContext)

    return (
        <div className={styles.mainContainer}>
            <TopContainer />
            <div className={styles.middleContainer}>
                {!selectedChatState.id ?
                    <ChatsContainer />
                    :
                    <ChatContainer />
                }
            </div>
        </div>
    )
}

export default MainPage