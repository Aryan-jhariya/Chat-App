import { createContext, useContext, useEffect, useState } from "react";
import { Authcontext } from "./AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const { socket } = useContext(Authcontext);

    //function to get all users for sidebar
    const getUsers = async () => {
        try {
            const { data } = await axios.get("/api/messages/users")
            console.log("getUsers response:", data)
            if (data.success) {
                setUsers(data.users || data.user || [])
                setUnseenMessages(data.unseenMessages || data.unseenMessage || {})
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //function to get messages for selected user
    const getMessages = async (userId) => {
        try {
            const { data } = await axios.get(`/api/messages/${userId}`);
            if (data.success) {
                setMessages(data.messages)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //function to send messages to selected user
    const sendMessage = async (messageData) => {
        try {
            if (!selectedUser) return;
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
            if (data.success) {
                setMessages((prevMessages) => [...prevMessages, data.newMessage])
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to subscribe to message for selected user
    const subscribeToMessages = async () => {
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            if (selectedUser && newMessage.sendId === selectedUser._id) {
                newMessage.seen = true;
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                axios.put(`/api/messages/marks/${newMessage._id}`)
            } else {
                setUnseenMessages((prev) => ({
                    ...prev,
                    [newMessage.sendId]: prev[newMessage.sendId] ? prev[newMessage.sendId] + 1 : 1
                }))
            }
        })
    }

    //function to unsubscribe from messages
    const unsubscribeFromMessages =()=>{
        if(socket) socket.off("newMessage");
    }

    useEffect(()=>{
       subscribeToMessages();
       return ()=> unsubscribeFromMessages();
    },[socket, selectedUser])

    const value = {
        messages,
        users,
        selectedUser,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}