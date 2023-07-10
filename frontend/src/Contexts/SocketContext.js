import { createContext, useContext, useEffect, useState } from "react";
import { SelectedChatContext } from "./SelectedChatContext.js";
import { getAuthToken } from "../utils/authToken.js";
import { io } from "socket.io-client"
import { UserInfoContext } from "./UserInfoContext.js";

export const SocketContext = createContext()
const socket = io("/", { autoConnect: false })

const SocketProvider = ({ children }) => {

    const [onlineUserIds, setOnlineUserIds] = useState([])
    const [updateChatList, setUpdateChatList] = useState(false)
    const { selectedChatState, setSelectedChatState, deleteSelectedChatParticipant, addSelectedChatParticipant, emptySelectedChatState } = useContext(SelectedChatContext)
    const { userInfoState } = useContext(UserInfoContext)

    useEffect(() => {
        socket.auth = { token: getAuthToken() }
        socket.connect()
    }, [])

    useEffect(() => {
        socket.on("userDisconnected", () => {
            socket.emit("onlineUsers")
        })

        socket.on("userConnected", () => {
            socket.emit("onlineUsers")
        })

        socket.on("onlineUsers", (userIds) => {
            setOnlineUserIds(userIds)
        })

        socket.on("message", ({ message }) => {
            setSelectedChatState(prevState => {
                return { ...prevState, messages: [...prevState.messages, message] }
            })
        })

        socket.on("messageDelete", (messageId) => {
            setSelectedChatState(prevState => {
                return { ...prevState, messages: [...prevState.messages.filter((message) => { return message.id !== messageId })] }
            })
        })

        socket.on("messageDeleteAll", ({ userId }) => {
            if (selectedChatState.id) {
                setSelectedChatState(prevState => {
                    return { ...prevState, messages: [...prevState.messages.filter((message) => { return message.messageCreator.id !== userId })] }
                })
            }
        })

        socket.on("userDelete", () => {
            setUpdateChatList(!updateChatList)
        })

        socket.on("chatParticipantDelete", ({ userId }) => {
            deleteSelectedChatParticipant(userId)
        })

        socket.on("chatParticipantRemove", ({ userId, chatId }) => {
            if (userId === userInfoState.id) {
                socket.emit("emptySelectedChat")
            } else if (selectedChatState.id === chatId) {
                setSelectedChatState(prevState => {
                    return { ...prevState, messages: [...prevState.messages.filter((message) => { return message.messageCreator.id !== userId })] }
                })
                deleteSelectedChatParticipant(userId)
            }
        })

        socket.on("chatParticipantAdd", (participant) => {
            addSelectedChatParticipant(participant.chatParticipant)
        })

        socket.on("chatCreate", () => {
            setUpdateChatList(!updateChatList)
        })

        socket.on("emptySelectedChat", () => {
            emptySelectedChatState()
            setUpdateChatList(!updateChatList)
        })

        socket.on("chatDelete", ({ chatId }) => {
            setUpdateChatList(!updateChatList)
            if (setSelectedChatState.id === chatId) emptySelectedChatState()
        })

        return () => {
            socket.off("userDisconnected")
            socket.off("userConnected")
            socket.off("onlineUsers")
            socket.off("message")
            socket.off("messageDelete")
            socket.off("messageDeleteAll")
            socket.off("userDelete")
            socket.off("chatParticipantDelete")
            socket.off("chatParticipantRemove")
            socket.off("chatParticipantAdd")
            socket.off("chatCreate")
            socket.off("emptySelectedChat")
            socket.off("chatDelete")
        }
    }, [addSelectedChatParticipant, deleteSelectedChatParticipant, emptySelectedChatState, selectedChatState, setSelectedChatState, updateChatList, userInfoState.id])

    useEffect(() => {
        socket.emit("onlineUsers")
    }, [])

    const valuesToProvide = { onlineUserIds, socket, updateChatList }

    return (
        <SocketContext.Provider value={valuesToProvide}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider