import React from 'react'
import './QuizCard.css'
import { useAuth } from '../../AuthContext/AuthContext';
import { useQuiz } from '../../AuthContext/quizConext';
import { useNavigate } from 'react-router-dom';

function QuizCard({QuizDetails}) {
 const navigate=useNavigate();
//  const {token}=useAuth();
 const {image,title,description,category}=QuizDetails;
  const {quizDispatch}=useQuiz();

   const handleUser=()=>{
     const token=localStorage.getItem('token');
     localStorage.setItem('category',category);
     if(token){
        quizDispatch({
            type:"CATEGORY",
            payload:category
        })
        navigate('/quiz');
     }
     else{
        navigate('/auth/login');
     }
   }

  return (
        <div className="quiz-card-container">
            <div className="quiz-image-container">
                <img className='quiz-image' src={image} alt="image" />
            </div>
            <div className="quiz-card-details">
            <div>
             <span className='quiz-card-font quiz-card-title '>{title}</span>
            </div>
            <div className="description">
                <span className='quiz-card-font'>{description}</span>
            </div>
            <button className='quiz-card-btn' onClick={handleUser}>Play Now</button>
            </div>
        </div>
  )
}

export default React.memo(QuizCard);