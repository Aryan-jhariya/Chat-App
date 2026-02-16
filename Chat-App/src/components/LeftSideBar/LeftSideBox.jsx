import React from 'react'
import './LeftSideBox.css'
import assets, { userDummyData } from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom';

const LeftSideBox = ({ selectedUser, setSelectedUser }) => {
    const navigate = useNavigate();
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
                            <p>Logout</p>
                        </div>
                    </div>
                </div>

                <div className="ls-search">
                    <img src={assets.search_icon} alt="search" />
                    <input type="text" placeholder="Search here.." />
                </div>
            </div>

            {/* CHAT LIST */}
            <div className="ls-list">
                {userDummyData.map((user, index) => (
                    <div
                        className={`friends ${selectedUser?._id === user._id ? "active-friend" : ""}`}
                        onClick={() => setSelectedUser(user)}
                        key={index}
                    >

                        <img src={user?.profilePic || assets.avatar_icon} alt="profile" />
                        <div>
                            <p>{user.fullName}</p>
                            {
                                index < 3
                                    ? <span className='online'>Online</span>
                                    : <span>Offline</span>
                            }
                        </div>
                        {index > 2 && <p>{index}</p>}
                    </div>
                ))}
            </div>

        </div>
    );
};


export default LeftSideBox