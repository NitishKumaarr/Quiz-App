
import axios from 'axios';

const loginHandler = async (email,password)=> {
    
    try{
     const {data:{token},status}=await axios.post("http://localhost:8080/auth/login",{
        email:email,
        password:password
     });
     console.log(status);
     if(status===200){
        localStorage.setItem("token",token);
        return true;
     }
   
    }
    catch(err){
        // const response=await err;
        // console.log(response);
        //  return null;
    }
}

export default loginHandler;