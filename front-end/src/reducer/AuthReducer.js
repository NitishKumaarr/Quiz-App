import React from 'react'

function AuthReducer(state,{type,payload}) {
   switch (type){
       case "INITIAL":
         return{
            ...state,
            token:payload
         }
       case "EMAIL":
        return{
            ...state,
            email:payload
        }
        case "PASSWORD":
        return{
            ...state,
            password:payload
        }
        case "TOKEN":
            return{
                ...state,
            token:payload
        }
        case "USERNAME":
            return{
                ...state,
           username:payload
        }
   }
}

export default AuthReducer;