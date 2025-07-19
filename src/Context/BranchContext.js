import { createContext , useContext, useState } from "react";
import { UserContext } from "./UserContext.js";
import axios from "axios";
import Swal from "sweetalert2";




export let BranchContext = createContext();


export default function BranchContextProvider(props){
   const {userToken } = useContext(UserContext) ;

   
   const [branches , setBranches] = useState([]) ;
   const[branch , setBranch] = useState({}) ;

   const header = {
      token:`${process.env.REACT_APP_BEARER_TOKEN} ${userToken || localStorage.getItem("token")}`
   }

   async function getAllBranches(id){
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/branch?company=${id}`  ,  {headers:header} )
      .then(({data})=>{
         if(data.message === "success"){
            setBranches(data.branches)
         }
      })
      .catch((error)=>{
         console.log(error.response.data.message);
      })
   }
   async function getSpecificBranch(id){
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/branch/${id}`  ,  {headers:header} )
      .then(({data})=>{
         if(data.message === "success"){
            setBranch(data.branch)
         }
      })
      .catch((error)=>{
         console.log(error.response.data.message);
      })
   }


   async function deleteBranch(id){
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!"
      }).then(async(result) => {
         if (result.isConfirmed) {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/branch/${id}`  ,  {headers:header} )
            .then(({data})=>{
               if(data.message === "success"){
                  Swal.fire({
                     title: "Successfully Deleted Branch",
                     text: "Your file has been deleted.",
                     icon: "success"
                  });
               }
            })
            .catch((error)=>{
               Swal.fire({
                  title:error.response.data.message  ,
                  text: "Please Try Again" ,   
                  icon: "error"
                  });
            })
         }
      });
   }

   return (
      <>
         <BranchContext.Provider value={{
               getAllBranches , 
               getSpecificBranch,
               deleteBranch,

               branch , 
               setBranch ,

               branches ,
               setBranches ,
            }}>
            {props.children}
         </BranchContext.Provider>
      </>
   )
}