import React, { useContext, useState } from 'react'
import './ProfileUpdate.css'
import assets from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Authcontext } from '../../../context/AuthContext.jsx'

const ProfileUpdate = () => {

  const { authUser, updateProfile } = useContext(Authcontext)

  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.userName)
  const [bio, setBio] = useState(authUser.bio)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      await updateProfile({ userName: name, bio });
      navigate('/chat');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, userName: name, bio })
      navigate('/chat');

    }
  }

  return (
    <div className='profile'>
      <div className="profile-container">
        <span
          className="profile-close"
          onClick={() => navigate('/chat')}
        >
          ✕
        </span>
        <form onSubmit={handleSubmit}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden
            />
            <img src={
              image
                ? URL.createObjectURL(image)
                : assets.avatar_icon} alt="" className={`w-12 h-12 ${image ? 'rounded-full' : ''}`} />
            upload profile image
          </label>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Your name' required />
          <textarea onChange={(e) => setBio(e.target.value)} value={bio} placeholder='Write Profile bio' required></textarea>
          <button type='submit'>Save</button>
        </form>
        <img className='profile-pic' src={authUser?.profilePic || assets.avatar_icon} alt="" />
      </div>
    </div>
  )
}

export default ProfileUpdate
