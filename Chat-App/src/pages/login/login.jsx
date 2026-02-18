import './Login.css'
import assets from '../../assets/assets'
import { useContext, useState } from 'react'
import { Authcontext } from '../../../context/AuthContext'

const Login = () => {

  const [currState, setCurrState] = useState("Sign Up")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const { login } = useContext(Authcontext)

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true)
      // signup(userName,email,password);
      return;
    }
    login(
      currState === "Sign Up" ? "signup" : "login", { userName, email, password, bio }
    );
  };

  return (
    <div className='login'>
      <img src={assets.logo_big} alt="" className='logo' />
      <form className='login-form' onSubmit={onSubmitHandler}>
        <h2>{currState}</h2>
        {currState === "Sign Up" && !isDataSubmitted && (
          <input onChange={(e) => setUserName(e.target.value)} value={userName} type="text" placeholder="UserName" className="form-input" required />)}
        {!isDataSubmitted && (
          <>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email Address' className='form-input' required />

            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='password' className='form-input' required />
          </>
        )}

        {currState === "Sign Up" && isDataSubmitted && (
          <textarea onChange={(e) => setBio(e.target.value)} value={bio} rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='provide a short Bio..' required></textarea>
        )}

        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login now"}
        </button>

        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className="log-forgot">
          {
            currState === "Sign Up"
              ? <p className="login-toggle">Already have an account <span onClick={() => { setCurrState("Login"); setIsDataSubmitted(false) }}>Login here</span></p>
              : <p className="login-toggle">
                Create an account
                <span onClick={() => {
                  setCurrState("Sign Up");
                  setIsDataSubmitted(false);
                }}>
                  Click here
                </span>
              </p>

          }
        </div>
      </form>
    </div>
  )
}

export default Login