
import React from 'react';
import './Auth.css';
import { useAuth } from '../../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Signup() {
    const navigate=useNavigate();
  const{username,email,password,AuthDispatch}=useAuth();
  console.log(username,email,password);
  const handleUsername=(e)=>{
    AuthDispatch({
        type:"USERNAME",
        payload:e.target.value
      })
  }
  const handleEmail=(e)=>{
    AuthDispatch({
        type:"EMAIL",
        payload:e.target.value
      })
  }
  const handlePassword=(e)=>{
    AuthDispatch({
        type:"PASSWORD",
        payload:e.target.value
      })
  }


const handleSignform= async(e)=>{
   e.preventDefault();
   await axios.post("http://localhost:8080/auth/signup",{
    username:username,
    email:email,
    password:password
 })
 .then(({data:{token},status})=>{
    localStorage.setItem("token",token)
    if(status===200){
      navigate('/');
      notify();
    }
    AuthDispatch({
      type:"TOKEN",
      payload:token
    })
    })    
     .catch(err=>{
       const message=err.response.data.message;
        Invalid(message);
      
      })
  }
  const notify=()=>{
    toast.success("Login Succesfully", {
      position: toast.POSITION.TOP_CENTER,
      theme:"dark",
      autoClose:1000,
    });
   }

   const Invalid=(text)=>{
    toast.error(text, {
      position: toast.POSITION.TOP_CENTER,
      theme:"dark",
      autoClose:1000,
    });
   }
  return (
    <div className='Auth-form-container'>
     <h2 className="login-head">Sign UP</h2>
     <form action="" className='form-element' onSubmit={handleSignform}>
     <div className="form-container">
        <label htmlFor="" id="username"><span className="input-name">Username</span></label>
        <input type="text" id="username" className='form-input' placeholder='Nitish123' onChange={handleUsername} />
      </div>
      <div className="form-container">
        <label htmlFor="" id="email">
            <span className="input-name">
          Email
            </span>
        </label>
         <input type="email" id="email"  className='form-input' placeholder='nitish@gmail.com' onChange={handleEmail}/>
      </div>
      <div className="form-container">
        <label htmlFor="" id="password"><span className="input-name">Password</span></label>
        <input type="password" id="password" className='form-input' placeholder='*****' onChange={handlePassword}/>
      </div>
      <button className='form-button'>SignUp</button>
     <ToastContainer/>
     </form>
  </div>

  )
}

export default Signup