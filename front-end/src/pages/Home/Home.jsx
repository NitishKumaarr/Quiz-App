import Navbar from '../../components/Navbar/Navbar';
import QuizCard from '../../components/Quizcard/QuizCard';
import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import {Route,Routes} from 'react-router-dom';
import AuthLogin from '../../components/Auth/Login';
import './Home.css';
import Quiz from '../../components/Quiz/Quiz';
import { useAuth } from '../../AuthContext/AuthContext';
import { ToastContainer} from 'react-toastify';
import Result from '../result/result';
import Signup from '../../components/Auth/signup';
import { useQuiz } from '../../AuthContext/quizConext';
const  Home=()=>{
  const[category,setCategory]=useState([]);
  const {token,AuthDispatch}=useAuth();
  const{score,quizDispatch}=useQuiz();
 useEffect(()=>{
  (
    
    async ()=>{
        try{
        const response=await axios.get("http://localhost:8080/category");
        console.log("hello home page");
        setCategory(response.data);
        }
        catch(err){
          console.log(err);
        }
  }
 )()
 },[])


  useEffect(()=>{
    const token=localStorage.getItem('token');
    const username=localStorage.getItem('username');
    const category=localStorage.getItem('category');
    AuthDispatch({
      type:"INITIAL",
      payload:token
    })
    AuthDispatch({
      type:"USERNAME",
      payload:username
    })
    quizDispatch({
      type:"CATEGORY",
      payload:category
  })
  quizDispatch({
    type:'INITIAL'
  })
  },[]);

  return (
    <div>
        <Navbar token={token}/>

         <Routes>

             <Route path='/' element={
                      <div className="all-quiz-list">
                      {category.map(card=><QuizCard QuizDetails={card} key={card._id} />)}
                      </div>
             }/>

             <Route path='/auth/login' element={<AuthLogin/>}/>
             <Route path='/quiz' element={<Quiz/>}></Route>
             <Route path='/result' element={<Result/>}/>
             <Route path='/auth/signup' element={<Signup/>}/>
         </Routes>
         <ToastContainer/>
    </div>
  )
}
export default Home;

