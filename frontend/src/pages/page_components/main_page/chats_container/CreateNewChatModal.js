import styles from "./CreateNewChatModal.module.css"
import { useContext, useState } from "react"
import { ReactComponent as CloseIcon } from "../../../../lib/icons/closeIcon.svg"
import { createPrivateChatService, createGroupChatService } from "../../../../services/chatServices.js"
import { SocketContext } from "../../../../contexts/SocketContext.js"

const CreateNewChatModal = ({ isShown, setIsShown }) => {

    const [selectedChatType, setSelectedChatType] = useState(0)
    const [privateChatParticipantUsername, setPrivateChatParticipantUsername] = useState("")
    const [groupChatName, setGroupChatName] = useState("")
    const [notification, setNotification] = useState({ value: "", color: 1 })
    const { socket } = useContext(SocketContext)

    const handleCreatePrivateChatClick = async (privateChatParticipantUsername, setNotification) => {
        const result = await createPrivateChatService(privateChatParticipantUsername)

        if (result.success) socket.emit("chatCreate", { chatId: result.data })

        setNotification({ value: result.message, color: result.success ? 1 : 2 })
    }

    const handleCreateGroupChatClick = async (groupChatName, setNotification) => {
        const result = await createGroupChatService(groupChatName)

        if (result.success) { socket.emit("chatCreate", { chatId: result.data }) }

        setNotification({ value: result.message, color: result.success ? 1 : 2 })
    }

    const emptyChatCreationValues = () => {
        setSelectedChatType(0)
        setNotification({ value: "", color: 1 })
        setGroupChatName("")
        setPrivateChatParticipantUsername("")
    }

    return (
        <div className={isShown ? styles.mainContainer : styles.hiddenMainContainer}>
            <div className={styles.contentContainer}>
                <div className={styles.topContainer}>
                    <p className={styles.topTitle}>Luo uusi keskustelu</p>
                    <button className={styles.closeButton}
                        type="button"
                        onClick={() => {
                            setIsShown(false)
                            emptyChatCreationValues()
                        }}
                    >
                        <CloseIcon fill={"rgb(70,70,70)"} />
                    </button>
                </div>
                <p className={notification.color === 1 ? styles.notificationText : styles.notificationErrorText}>{notification.value}</p>
                <div className={styles.chatTypeSelectionButtonsContainer}>
                    <button className={styles.chatTypeSelectionButton}
                        type="button"
                        onClick={() => { setSelectedChatType(1) }}
                        is-selected={selectedChatType === 1 ? "true" : "false"}
                    >
                        Yksityinen
                    </button>
                    <button className={styles.chatTypeSelectionButton}
                        type="button"
                        onClick={() => { setSelectedChatType(2) }}
                        is-selected={selectedChatType === 2 ? "true" : "false"}
                    >
                        Ryhmä
                    </button>
                </div>
                {selectedChatType === 1 ?
                    <form className={styles.createChatForm}
                        onSubmit={(event) => {
                            event.preventDefault()
                            handleCreatePrivateChatClick(privateChatParticipantUsername, setNotification)
                        }}
                    >
                        <input
                            className={styles.inputField}
                            value={privateChatParticipantUsername}
                            placeholder="Käyttäjän nimi..."
                            onChange={(event) => { setPrivateChatParticipantUsername(event.target.value) }}
                        />
                        <input
                            type="submit"
                            className={styles.createButton}
                            value={"Luo yksityinen keskustelu"}
                        />
                    </form>
                    :
                    selectedChatType === 2 ?
                        <form className={styles.createChatForm}
                            onSubmit={(event) => {
                                event.preventDefault()
                                handleCreateGroupChatClick(groupChatName, setNotification)
                            }}
                        >
                            <input
                                className={styles.inputField}
                                value={groupChatName}
                                placeholder="Ryhmän nimi..."
                                onChange={(event) => { setGroupChatName(event.target.value) }}
                            />
                            <input
                                type="submit"
                                className={styles.createButton}
                                value={"Luo ryhmä keskustelu"}
                            />
                        </form>
                        :
                        <></>
                }
            </div>
        </div >
    )
}

export default CreateNewChatModal