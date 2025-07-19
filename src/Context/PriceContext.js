import axios from "axios";
import { createContext , useContext, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "./UserContext.js";


export let PriceContext = createContext();


export default function CartContextProvider(props){

   const [price , setPrice] = useState([]);
   const [priceDetails , setPriceDetails] = useState({});
   const [error , setError] = useState(null) ;
   const [loading , setLoading] = useState(false)
   const {userToken } = useContext(UserContext) ;

   const header = {
      token:`${process.env.REACT_APP_BEARER_TOKEN} ${userToken || localStorage.getItem("token")}`
   }

   async function getSpecificPrice(id){
      let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/price/${id}` , {headers:header})
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
            });
      });
      if(response?.data.message === "success"){
         setPriceDetails(response.data?.price)
      }
   }


   
   return (
      <>
         <PriceContext.Provider value={{price , setPrice , error , setError , loading , setLoading , getSpecificPrice , priceDetails}}>
            {props.children}
         </PriceContext.Provider>
      </>
   )
}