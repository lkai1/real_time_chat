import { useContext } from "react"
import styles from "./ParticipantList.module.css"
import { SelectedChatContext } from "../../../../../../Contexts/SelectedChatContext.js"
import ParticipantItem from "./ParticipantItem.js"
import { v4 as uuidv4 } from "uuid"
import { SocketContext } from "../../../../../../Contexts/SocketContext.js"

const ParticipantList = () => {

    const { selectedChatState } = useContext(SelectedChatContext)
    const { onlineUserIds } = useContext(SocketContext)

    return (
        <div className={styles.mainContainer}>
            {selectedChatState.chatParticipants?.[0] &&
                selectedChatState.chatParticipants.map((chatParticipant) => {
                    return <ParticipantItem
                        key={uuidv4()}
                        userId={chatParticipant.id}
                        username={chatParticipant.username}
                        onlineUserIds={onlineUserIds}
                    />
                })
            }
        </div>
    )
}

export default ParticipantList