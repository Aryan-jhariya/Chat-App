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

      {/* ---- PROFILE SECTION ---- */}
      <div className="rs-profile">

        {/* User Profile Image */}
        <div className="profile-img-wrapper">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt="User Profile"
          />

          {/* Online Status Indicator */}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="online-indicator"></span>
          )}
        </div>

        {/* Username */}
        <h3>{selectedUser.userName}</h3>

        {/* User Bio */}
        <p>{selectedUser.bio || "No bio available"}</p>
      </div>

      <hr />

      {/* ---- MEDIA SECTION ---- */}
      <div className="rs-media">

        {/* Media Title */}
        <h4>Shared Media</h4>

        {/* Media Grid */}
        <div className="media-grid">

          {/* Show images if available */}
          {msgImages.length > 0 ? (
            msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="media-item"
              >
                <img src={url} alt="Shared media" />
              </div>
            ))
          ) : (
            <p className="no-media">No media shared</p>
          )}

        </div>
      </div>

      {/* ---- LOGOUT BUTTON ---- */}
      <div className="logout-wrapper">
        <button onClick={() => { logout(); navigate('/login'); }}>
          Logout
        </button>
      </div>

    </div>
  )
}

export default RightSideBar