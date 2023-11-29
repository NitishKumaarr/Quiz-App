import React from 'react';
import './Auth.css';
import { useAuth } from '../../AuthContext/AuthContext';
import loginHandler from '../../AuthService/AuthService';
import { useNavigate } from 'react-router-dom';
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
function AuthLogin() {
  const navigate=useNavigate();
  const {email,password,token,AuthDispatch}=useAuth();
  console.log(token);
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
   const handleLoginForm= async (e)=>{
      e.preventDefault();
    //  const token= loginHandler(email,password);
    //  console.log(token);
    
      await axios.post("http://localhost:8080/auth/login",{
         email:email,
         password:password
      })
      .then(({data:{token,username,message},status})=>{
        console.log(status,username,message);
        localStorage.setItem("token",token)
        localStorage.setItem("username",username);
        if(status===200){
          navigate('/');
          notify();
        }
        AuthDispatch({
          type:"TOKEN",
          payload:token
        })
        AuthDispatch({
          type:"USERNAME",
          payload:username
        })
        
      })
     .catch(err=>{
         const message=err.response.data.message;
         Invalid(message);
         
     })

    //  if(token){
    //    navigate('/');
    //    notify();
    //  }
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
         <h2 className="login-head">Login</h2>
         <form action="" className='form-element' onSubmit={handleLoginForm}>
          <div className="form-container">
            <label htmlFor="" id="username">
                <span className="input-name">
              Email
                </span>
            </label>
             <input type="email" id="username"  className='form-input' placeholder='nitish@gmail.com' onChange={handleEmail}/>
          </div>
          <div className="form-container">
            <label htmlFor="" id="password"><span className="input-name">Password</span></label>
            <input type="password" id="password" className='form-input' placeholder='*****' onChange={handlePassword} />
          </div>
          <button className='form-button'>Login</button>
         <ToastContainer/>
         </form>
      </div>
  )
}

export default AuthLogin;