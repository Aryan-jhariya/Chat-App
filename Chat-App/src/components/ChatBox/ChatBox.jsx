import React, { useEffect, useContext, useState, useRef } from 'react'
import './ChatBox.css'
import assets, { messagesDummyData } from '../../assets/assets.js'
import { formatMessageTime } from '../../lib/utils.js'
import { ChatContext } from '../../../context/ChatContext.jsx'
import { Authcontext } from '../../../context/AuthContext.jsx'
import toast from 'react-hot-toast'

const ChatBox = () => {

  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext)

  const { authUser, onlineUser } = useContext(Authcontext)

  const [input, setInput] = useState('');

  const messagesEndRef = useRef(null);

  // Auto scroll when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);




  //Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() })
    setInput("")
  }

  //handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("select an image file")
      return;
    }
    const reader = new FileReader();

    reader.onloadend = async () => {
      await sendMessage({ image: reader.result })
      e.target.value = ""
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id)
    }
  }, [selectedUser])


  return selectedUser ? (
    <div className='chat-box'>
      {/* ----HEADER--- */}
      <div className="chat-user">
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" />
        <p>{selectedUser.userName}
          {onlineUser.includes(selectedUser._id) && <span className='w-2 h-2 rounded-full bg-green-500'></span>} </p>
        <img onClick={() => setSelectedUser(null)} src={assets.help_icon} className='help' alt="" />
      </div>

      {/* CHAT AREA  */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll px-4 py-6 pb-3 space-y-3'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end 
          ${msg.senderId !== authUser._id && 'flex-row-reverse'}
          `}>
            {msg.image ? (
              <img src={msg.image} alt="" className='max-w-57.5 border border-gray-700 rounded-lg overflow-hidden mb-8' />
            ) : (
              <p className={`message-bubble ${msg.senderId === authUser._id ? "message-own" : "message-other"}`}>{msg.text}</p>
            )}
            <div className='text-center text-xs'>
              <img src={
                msg.senderId === authUser._id
                  ? authUser?.profilePic || assets.avatar_icon
                  : selectedUser?.profilePic || assets.avatar_icon
              }
                alt="" className='w-7 rounded-full' />
              <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom AREA */}
      <div className="chat-input">
        <input onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null} type="text" placeholder='Send a message' />
        <input onChange={handleSendImage} type="file" id='image' accept='image/png, image/jpeg' hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img onClick={handleSendMessage} src={assets.send_button} alt="" />
      </div>
    </div>
  ) : (
    <div className='user-not-selected'>
      <img src={assets.logo_icon} alt="" />
      <p>Chat anytime anyWhere!!</p>
    </div>
  )
}

export default ChatBox