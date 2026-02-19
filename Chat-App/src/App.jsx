import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login/login.jsx'
import Chat from './pages/Chat/Chat.jsx'
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate.jsx'
import { Toaster } from "react-hot-toast"
import { useContext } from 'react'
import { Authcontext } from '../context/AuthContext.jsx'

const App = () => {
  const { authUser, isLoading } = useContext(Authcontext)
  if (isLoading) return <div />
  return (
    <div >
      <Toaster />
      <Routes>

        <Route path='/' element={<Navigate to="/login"/>}></Route>

        <Route path='/chat' element={authUser ? <Chat /> : <Navigate to="/login"/>}></Route>

        <Route path='/login' element={!authUser ? <Login /> : <Navigate to = "/chat"/>}></Route>
        
        <Route path='/profile' element={authUser ? <ProfileUpdate /> : <Navigate to = "/login"/>}></Route>
        
        {/* <Route path='/chat' element={<Chat />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/profile' element={<ProfileUpdate /> }></Route> */}
      </Routes>
    </div>
  )
}

export default App
