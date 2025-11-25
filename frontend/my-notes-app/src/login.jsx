import React,{useState} from 'react';
import './styling/login.css'
import { useNavigate } from 'react-router-dom';

import googleLogo from './assests/ggl.png';
import facebookLogo from './assests/fb.png';

const Login =()=>{
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      alert("✅ Login successful!");

    
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("email", data.user.email);

      navigate("/");
    } else {
      alert(`⚠️ ${data.message}`);
    }
  } catch (err) {
    alert("❌ Something went wrong: " + err.message);
  }
};


  const handleClickGgl =()=>{ alert('Google Login') }
  const handleClickFb =()=>{ alert('Facebook Login') }

  return(
    <div className="Login">

      <div className='Main-Login-Container'>
        <div className='login-main'>
          <div className='Login-title'>
            <h2>Hey! Log in</h2>
            <p>Hello Please Login to use This Application </p>
          </div>

          <div className='Login-boxes'>
            <form className='email&passowrd'>
              <input 
                type='email' 
                placeholder='Email' 
                required 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <input 
                type='password' 
                placeholder='Password' 
                required 
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </form>

            <button onClick={handleLogin}>Let's Start!</button>
            <a href='#'>Forgot Password?!</a>

            <p>Don't Have An Account <a href='/signin'>Please Sign in</a></p>

            <div className="social-login">
              <img src={googleLogo} alt="Google" className='social-icon' onClick={handleClickGgl}/>
              <img src={facebookLogo} alt="Facebook" className='social-icon' onClick={handleClickFb}/>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Login;
