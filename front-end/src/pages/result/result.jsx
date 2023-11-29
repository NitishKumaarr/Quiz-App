import React from 'react'
import './result.css'
import { useQuiz } from '../../AuthContext/quizConext';
function Result() {
  const{score}=useQuiz();
  return (
    <div className='result-container'>
       <div className="result-head">Result</div>
       <div className="quiz-score">
        Your score is
       </div>
       <div className="score">
        {score*5}
       </div>
    </div>
  )
}

export default React.memo(Result);