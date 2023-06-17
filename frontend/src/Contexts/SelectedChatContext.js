import { createContext, useState, useMemo } from "react";
import { getChatMessagesService } from "../services/messageServices.js";

export const SelectedChatContext = createContext({})

const SelectedChatProvider = ({ children }) => {
    const [selectedChatState, setSelectedChatState] = useState({})

    const valuesToProvide = useMemo(
        () => ({
            selectedChatState,
            setSelectedChatState,
            updateSelectedChatState: async (chat) => {
                const messages = await getChatMessagesService(chat.id)
                    .then((chatMessages) => {
                        return chatMessages
                    }).catch((_error) => { return [] })

                setSelectedChatState({ ...chat, messages })
            },
            addSelectedChatParticipant: async (participant) => {
                setSelectedChatState(prevState => {
                    return { ...prevState, chatParticipants: [...prevState.chatParticipants, participant] }
                })
            },
            deleteSelectedChatParticipant: async (participantId) => {
                setSelectedChatState(prevState => {
                    return { ...prevState, chatParticipants: [...prevState.chatParticipants.filter((participant) => { return participant.id !== participantId })] }
                })
            },
            emptySelectedChatState: () => {
                setSelectedChatState({})
            }
        }),
        [selectedChatState]
    )

    return (
        <SelectedChatContext.Provider value={valuesToProvide}>
            {children}
        </SelectedChatContext.Provider>
    )
}

export default SelectedChatProvider