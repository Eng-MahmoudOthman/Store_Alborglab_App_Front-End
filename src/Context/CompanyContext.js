import axios from 'axios';
import React, { useContext } from 'react' ;
import { createContext , useState } from "react";
import { UserContext } from './UserContext.js';



export let CompanyContext = createContext();



export default function CompanyContextProvider(props){

   const [companies , setCompanies] = useState([]) ;
   const [company , setCompany] = useState({}) ;
   const [loading , setLoading] = useState(false) ;
   const {userToken } = useContext(UserContext) ;

   

   const header = {
      token:`${process.env.REACT_APP_BEARER_TOKEN} ${userToken || localStorage.getItem("token")}`
   }
   
   async function getCompanies (){
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/company`  , {headers:header} )
      .then(({data})=>{
         if(data.message === "success"){
            setCompanies(data.companies) ;
         }
      })
      .catch((error)=>{
         console.log(error.response.data.message);
      })
   }



   return (
      <>
         <CompanyContext.Provider value={{
               getCompanies ,
               companies , 
               setCompanies , 
               loading , 
               setLoading ,
               company , 
               setCompany
            }}>
            {props.children}
         </CompanyContext.Provider>
      </>
   )
}

