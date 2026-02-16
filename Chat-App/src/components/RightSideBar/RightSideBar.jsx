import React from 'react'
import './RightSideBar.css'
import assets, { imagesDummyData } from '../../assets/assets'

const RightSideBar = ({selectedUser}) => {
  return selectedUser && (
    <div className={`rs ${selectedUser ? "max-md:hidden" : ""}`}>
      <div className="rs-profile">
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" />
        <h3>{selectedUser.fullName}<img src={assets.green_dot} className='dot' alt="" /></h3>
        <p>{selectedUser.bio}</p>
      </div>
      <hr />
      <div className="rs-media px-5">
        <p>Media</p>
        <div className='mt-2 max-h-50 overflow-y-scoll grid grid-cols-2 gap-4 opacity-80'>
          {imagesDummyData.map((url,index)=>(
            <div key={index} onClick={()=> window.open(url)} className='cursor-pointer rounded'>
              <img src={url} alt="" className='h-full rounded-md'/>
            </div>
          ))}
        </div>
      </div>
      <button>Logout</button>
    </div>
  )
}

export default RightSideBar