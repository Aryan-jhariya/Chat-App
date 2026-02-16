import React, { useState } from 'react'
import './ChatBox.css'
import assets, { messagesDummyData } from '../../assets/assets.js'
import { formatMessageTime } from '../../lib/utils.js'

const ChatBox = ({ selectedUser, setSelectedUser }) => {
  return selectedUser ? (
    <div className='chat-box'>
      {/* ----HEADER--- */}
      <div className="chat-user">
        <img src={assets.profile_img} alt="" />
        <p>Richard Sanford <img className='dot' src={assets.green_dot} alt="" /></p>
        <img onClick={() => setSelectedUser(null)} src={assets.help_icon} className='help' alt="" />
      </div>

      {/* CHAT AREA  */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll px-4 py-6 pb-3 space-y-3'>
        {messagesDummyData.map((msg, index)=>(
          <div 
            key={index} 
            className={`flex items-end gap-2 justify-end 
          ${msg.senderId !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'}
          `}>
            {msg.image ?(
              <img src={msg.image} alt="" className='max-w-57.5 border border-gray-700 rounded-lg overflow-hidden mb-8'/>
            ):(
              <p className={`p-6 max-w-50 md:text-sm font-light rounded-lg mb-8 break-all bg-[#077eff] text-white ${msg.senderId === '680f50e4f10f3cd28382ecf9' ? 'rounded-br-none' : 'rounded-bl-none'}`}>{msg.text}</p>
            )}
            <div className='text-center text-xs'>
              <img src={msg.senderId === '680f50e4f10f3cd28382ecf9' ? assets.avatar_icon : assets.profile_martin} alt="" className='w-7 rounded-full'/>
              <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom AREA */}
      <div className="chat-input">
        <input type="text" placeholder='Send a message' />
        <input type="file" id='image' accept='image/png, image/jpeg' hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" />
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