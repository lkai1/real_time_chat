import { createContext, useEffect, useState, useMemo } from "react";
import { getChatMessagesService } from "../services/messageServices";

export const SelectedChatContext = createContext({})

const SelectedChatProvider = ({ children }) => {

    const [selectedChatState, setSelectedChatState] = useState("")
    const [selectedChatMessagesState, setSelectedChatMessagesState] = useState([])

    useEffect(() => {
        if (selectedChatState) {
            getChatMessagesService(selectedChatState)
                .then((chatMessages) => {
                    setSelectedChatMessagesState(chatMessages)
                })
                .catch((_error) => { return })
        }
    }, [selectedChatState])

    const valuesToProvide = useMemo(
        () => ({
            selectedChatState,
            setSelectedChatState,
            selectedChatMessagesState
        }),
        [selectedChatState, setSelectedChatState, selectedChatMessagesState],
    );

    return (
        <SelectedChatContext.Provider value={valuesToProvide}>
            {children}
        </SelectedChatContext.Provider>
    )
}

export default SelectedChatProvider