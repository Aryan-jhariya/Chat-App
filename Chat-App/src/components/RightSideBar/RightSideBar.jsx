import React, { useContext, useEffect, useState } from 'react'
import './RightSideBar.css'
import assets, { imagesDummyData } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Authcontext } from '../../../context/AuthContext.jsx'
import { ChatContext } from '../../../context/ChatContext.jsx'

const RightSideBar = () => {

  const {selectedUser, messages} = useContext(ChatContext)

  const { logout, onlineUsers } = useContext(Authcontext)

  const [msgImages, setMsgImages] = useState([])

  //Get all the images from the messages and seet them to state
  useEffect(()=>{
    setMsgImages(
      messages.filter(msg=> msg.image).map(msg=>msg.image)
    )
  },[messages])


  const navigate = useNavigate();

  return selectedUser && (
    <div className={`rs ${selectedUser ? "max-md:hidden" : ""}`}>
      <div className="rs-profile">
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" />
        <h1>{onlineUsers.includes(selectedUser._id) && <img src={assets.green_dot} className='dot' alt="" />}{selectedUser.userName}</h1>
        <p>{selectedUser.bio}</p>
      </div>
      <hr />
      <div className="rs-media px-5">
        <p>Media</p>
        <div className='mt-2 max-h-50 overflow-y-scoll grid grid-cols-2 gap-4 opacity-80'>
          {msgImages.map((url,index)=>(
            <div key={index} onClick={()=> window.open(url)} className='cursor-pointer rounded'>
              <img src={url} alt="" className='h-full rounded-md'/>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => { logout(); navigate('/login'); }}>Logout</button>
    </div>
  )
}

export default RightSideBar