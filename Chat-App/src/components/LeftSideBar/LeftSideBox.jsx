import React, { useContext, useEffect, useState } from 'react'
import './LeftSideBox.css'
import assets from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../../../context/AuthContext.jsx'
import { ChatContext } from '../../../context/ChatContext.jsx';

const LeftSideBox = () => {

    const chatCtx = useContext(ChatContext) || {};
    const { getUsers, users = [], selectedUser, setSelectedUser, unseenMessages = {}, setUnseenMessages } = chatCtx;

    const authCtx = useContext(Authcontext) || {};
    const { logout, onlineUsers = [] } = authCtx;

    const [input, setInput] = useState("")
    
    const navigate = useNavigate();

    const filteredUsers = users.filter((user) => !input || (user.fullName || '').toLowerCase().includes(input.toLowerCase()));

    useEffect(()=>{
        if (getUsers) getUsers();
    },[onlineUsers])
    
    return (
        <div className={`ls ${selectedUser ? "hide-mobile" : ""}`}>

            {/* TOP SECTION */}
            <div className="ls-top">
                <div className="ls-nav">
                    <img src={assets.logo} className="logo" alt="logo" />
                    <div className="menu">
                        <img src={assets.menu_icon} alt="menu" />
                        <div className="sub-menu">
                            <p onClick={() => navigate('/profile')}>Edit Profile</p>
                            <hr />
                            <p onClick={() => { logout(); navigate('/login'); }}>Logout</p>
                        </div>
                    </div>
                </div>

                <div className="ls-search">
                    <img src={assets.search_icon} alt="search" />
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Search here.." />
                </div>
            </div>

            {/* CHAT LIST */}
            <div className="ls-list">
                {filteredUsers.map((user, index) => (
                    <div
                        className={`friends ${selectedUser?._id === user._id ? "active-friend" : ""}`}
                        onClick={() => {
                            setSelectedUser(user);
                            if (typeof setUnseenMessages === 'function') {
                                setUnseenMessages(prev => ({ ...prev, [user._id]: 0 }));
                            }
                        }}
                        key={index}
                    >

                        <img src={user?.profilePic || assets.avatar_icon} alt="profile" />
                        <div>
                            <p>{user.fullName || user.userName || user.name || 'Unknown'}</p>
                            {
                                onlineUsers.includes(user._id)
                                    ? <span className='online'>Online</span>
                                    : <span>Offline</span>
                            }
                        </div>
                        {unseenMessages[user._id] > 0 && <p>{unseenMessages[user._id]}</p>}
                    </div>
                ))}
            </div>

        </div>
    );
};


export default LeftSideBox