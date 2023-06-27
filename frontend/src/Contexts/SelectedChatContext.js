import { createContext, useState, useMemo } from "react";
import { getChatMessagesService } from "../services/messageServices.js";

export const SelectedChatContext = createContext({})

const SelectedChatProvider = ({ children }) => {

    const emptyChat = useMemo(() => {
        return {
            id: "",
            chatName: "",
            chatParticipants: [],
            creatorId: "",
            isGroup: null,
            messages: []
        }
    }, [])

    const [selectedChatState, setSelectedChatState] = useState(emptyChat)

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
                setSelectedChatState(emptyChat)
            }
        }),
        [emptyChat, selectedChatState]
    )

    return (
        <SelectedChatContext.Provider value={valuesToProvide}>
            {children}
        </SelectedChatContext.Provider>
    )
}

export default SelectedChatProvider