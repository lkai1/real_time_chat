import styles from "./MiddleLeftContainer.module.css"
import ChatList from "./ChatList.js"
import CreateNewChatModal from "./CreateNewChatModal.js"
import { useState } from "react"
import { ReactComponent as AddIcon } from "../../../../lib/icons/addIcon.svg"

const MiddleLeftContainer = () => {

    const [showCreateNewChatModal, setShowCreateNewChatModal] = useState(false)

    return (
        <div className={styles.mainContainer}>
            <ChatList />
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

export default MiddleLeftContainer