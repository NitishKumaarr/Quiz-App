import { useContext,createContext,useReducer } from "react";
import AuthReducer from "../reducer/AuthReducer";
const intialState={
    username:"",
    email:"",
    password:"",
    token:"",
}

const AuthContext=createContext();

const AuthProvider=({children})=>{
    const[{email,password,token,username},AuthDispatch]=useReducer(AuthReducer,intialState);
    
    return(
        <AuthContext.Provider value={{email,password,token,username,AuthDispatch}}>
            {children}
        </AuthContext.Provider>
    )
};

const useAuth=()=>useContext(AuthContext);

export {AuthProvider,useAuth};
