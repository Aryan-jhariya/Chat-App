import React, { useState } from 'react'
import './Chat.css'
import LeftSideBox from '../../components/LeftSideBar/LeftSideBox.jsx'
import ChatBox from '../../components/ChatBox/ChatBox.jsx'
import RightSideBar from '../../components/RightSideBar/RightSideBar.jsx'

const Chat = () => {
  const [selectedUser, setSelectedUSer] = useState(false)
  return (
    <div className='chat'>
       <div className={`chat-Container ${selectedUser ? 'three-col' : 'two-col'}`}>
        <LeftSideBox selectedUser={selectedUser} setSelectedUser={setSelectedUSer}/>
        <ChatBox selectedUser={selectedUser} setSelectedUser={setSelectedUSer}/>
        <RightSideBar selectedUser={selectedUser} setSelectedUser={setSelectedUSer}/>
      </div>
    </div>
  )
}

export default Chat 