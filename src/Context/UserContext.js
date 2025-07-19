import axios from "axios";
import { createContext , useState } from "react";
import notification from "../Utilities/notification.js";




export let UserContext = createContext();


export default function UserContextProvider(props){


   const [loggedUser , setLoggedUser] = useState({}) ;

   const [userToken , setUserToken] = useState(localStorage.getItem("token")) ;
   const [error , setError] = useState(null) ;
   const [loading , setLoading] = useState(false)
   const [role , setRole] = useState("") ;
   const [user , setUser] = useState({}) ;
   const [users , setUsers] = useState([]) ;
   const [team , setTeam] = useState([]) ;


   const header = {
      token:`${process.env.REACT_APP_BEARER_TOKEN} ${userToken || localStorage.getItem("token")}`
   }
   
   async function getSpecificUser (id){
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/users/${id}`  ,  {headers:header} )
      .then(({data})=>{
         if(data.message === "success"){
            setUser(data.user);
            console.log("UserContextProvider" , data.user);
         }
      })
      .catch((error)=>{
         notification("error" , error.response.data.message)
      })
   }


   async function getUserTeam (branchId){      
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/users?branch=${branchId}`)
      .then(({data})=>{
         if(data.message === "success"){
            setTeam(data.users);
         }
      })
      .catch((error)=>{
         console.log(error.response.data.message);
      })
   }



   return (
      <>
         <UserContext.Provider 
            value={{
               team ,
               setTeam ,

               user ,  
               setUser , 

               users , 
               setUsers ,

               role , 
               setRole , 

               loggedUser , 
               setLoggedUser , 

               userToken , 
               setUserToken , 

               error , 
               setError , 

               loading , 
               setLoading ,

               getSpecificUser ,
               getUserTeam
            }}>
            {props.children}
         </UserContext.Provider>
      </>
   )
}