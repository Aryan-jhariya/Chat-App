import React, { useState } from 'react'
import './ProfileUpdate.css'
import assets from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const ProfileUpdate = () => {

  const [image,setImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("MArtin Johnson")
  const [bio, setBio] = useState("Hi Everyone, I am USing QuickChat")

  const handleSubmit = async (e)=>{
    e.preventDefault();
    navigate('/chat')

  }

  return (
    <div className='profile'>
      <div className="profile-container">
        <form onSubmit={handleSubmit}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden
             />
            <img src={
              image
              ? URL.createObjectURL(image) 
              : assets.avatar_icon} alt="" className={`w-12 h-12 ${image ? 'rounded-full' : ''}`}/>
            upload profile image
          </label>
          <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Your name' required />
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio} placeholder='Write Profile bio' required></textarea>
          <button type='submit'>Save</button>
        </form>
        <img className='profile-pic'  src={image? URL.createObjectURL(image) : assets.logo_icon} alt="" />
      </div>

    </div>
  )
}

export default ProfileUpdate
