import React from 'react' ;
import { createContext , useState } from "react";



export let PatientContext = createContext();



export default function PatientContextProvider(props){

   const [patient , setPatient] = useState({}) ;
   const [loading , setLoading] = useState(false) ;


   return (
      <>
         <PatientContext.Provider value={{patient , setPatient , loading , setLoading}}>
            {props.children}
         </PatientContext.Provider>
      </>
   )
}

