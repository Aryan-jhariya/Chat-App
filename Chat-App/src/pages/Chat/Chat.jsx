import { useContext } from 'react'
import './Chat.css'
import LeftSideBox from '../../components/LeftSideBar/LeftSideBox.jsx'
import ChatBox from '../../components/ChatBox/ChatBox.jsx'
import RightSideBar from '../../components/RightSideBar/RightSideBar.jsx'
import { ChatContext } from '../../../context/ChatContext.jsx'

const Chat = () => {

  const {selectedUser} = useContext(ChatContext)

  return (
    <div className='chat'>
       <div className={`chat-Container ${selectedUser ? 'three-col' : 'two-col'}`}>
        <LeftSideBox />
        <ChatBox />
        <RightSideBar />
      </div>
    </div>
  )
}

export default Chat 