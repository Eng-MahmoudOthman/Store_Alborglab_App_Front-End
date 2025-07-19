import React, { Fragment, useContext, useState } from 'react';
import style from "./ChangeColor.module.css";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext.js';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { jwtDecode } from "jwt-decode";




export default function ChangeColor() {
   const navigate = useNavigate() ;
   const {userToken , setUserToken , setRole , loggedUser , setLoggedUser} = useContext(UserContext) ;
   const [error , setError] = useState(null)
   const [loading , setLoading] = useState(false)

   const header = {
      token:`${process.env.REACT_APP_BEARER_TOKEN} ${userToken || localStorage.getItem("token")}`
   }


   async function submitChangeColor(values){
      setLoading(true)
      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/users` , values ,  {headers:header})
      .then(({data})=>{
         if(data?.message === "success"){
            setLoading(false)

            //& save Token In Local Storage And Save Token in Use Context :
            localStorage.setItem("token" , data.token) ;
            setUserToken(data.token) ;
            const token = data.token ;
            let decoded = jwtDecode(token);
            setLoggedUser(decoded) ;
            

            //& Set Main Color From Database :
            document.documentElement.style.setProperty("--main-color" ,decoded.color )

            //& Set Role :
            setRole(decoded.role)
            navigate("/home") ; 
         }
      })
      .catch((error)=>{
         setError(error.response.data.message)
         console.log(error.response.data.message);
         setLoading(false)
      })
   }


   let validationSchema = Yup.object({
      color:Yup.string().required().trim() ,
   })


   let formik = useFormik({
      initialValues:{
         color:loggedUser.color ,
      } , validationSchema , 
      onSubmit:submitChangeColor
   })

   return (
      <Fragment>
         <div className='container'>
            <h1 className='main-header'>Change Color</h1>

            <form action="" onSubmit={formik.handleSubmit} >

               {error?<p className="text-danger">{error}</p> :""}

               <div className="my-4 text-center">
                  <label htmlFor="color" className="form-label">Choose Color </label>
                  <input type="color" 
                     value={formik.values.color}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className={`form-control  ${style.color}`} id="color"  
                     name="color" />
                  {
                     formik.errors.color  && formik.touched.color?
                        <div className="text-danger m-0 p-0">{formik.errors.color}</div> 
                        : 
                        <p className="text-success m-0 p-0"></p>
                  }
               </div>

               <div className="d-grid gap-2 col-8 mx-auto">
                  {loading ? 
                        <button className="btn bg-main text-white  mt-2"> <i className="fa-solid fa-spinner fa-spin fa-rotate-180 fa-xl"></i></button>
                     : 
                        <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main  mt-2 rounded-0">Change Save</button>
                  }
               </div>

            </form>

         </div>
      </Fragment>
   )
}
