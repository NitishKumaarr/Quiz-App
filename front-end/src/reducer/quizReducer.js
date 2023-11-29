const quizReducer=(state,{type,payload})=>{
    console.log(payload);
    switch(type){
      case 'INITIAL':
        return{
          ...state,
          index:0,
          score:0,
          selectedoption:null
        }


        case "CATEGORY":
         return {
        ...state,
        quizcategory:payload
        }
        case "INDEX":
         return {
        ...state,
        index:state.index+1,
        selectedoption:""
        }
        case "SELECT_OPTION":
         return {
        ...state,
        selectedoption:payload.id
        }
        case "SCORE":
        return{
          ...state,
          score:state.score+1
        }
        case "SUBMIT":
          return{
            ...state,
            index:0,
            selectedoption:null
          }
    }

}

export default quizReducer;