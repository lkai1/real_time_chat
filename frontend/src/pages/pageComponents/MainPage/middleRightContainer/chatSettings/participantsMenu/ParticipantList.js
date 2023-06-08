import { useContext } from "react"
import styles from "./ParticipantList.module.css"
import { SelectedChatContext } from "../../../../../../Contexts/SelectedChatContext.js"
import ParticipantItem from "./ParticipantItem.js"
import { v4 as uuidv4 } from "uuid"

const ParticipantList = () => {

    const { selectedChatState } = useContext(SelectedChatContext)
    return (
        <div className={styles.mainContainer}>
            {selectedChatState.chatParticipants?.[0] &&
                selectedChatState.chatParticipants.map((chatParticipant) => {
                    return <ParticipantItem
                        key={uuidv4()}
                        username={chatParticipant.username}
                    />
                })
            }
        </div>
    )
}

export default ParticipantList