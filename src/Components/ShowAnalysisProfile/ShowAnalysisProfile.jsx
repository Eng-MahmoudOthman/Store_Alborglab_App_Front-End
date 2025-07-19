import React, { useContext, useEffect, useState } from 'react';

import style from "./ShowAnalysisProfile.module.css"
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext.js';
import Loading from '../Loading/Loading.jsx';
import CustomTitle from '../CustomTitle/CustomTitle.jsx';







export default function ShowAnalysisProfile() {
   const [loading , setLoading] = useState(false)
   const [error , setError] = useState("")
   const [profile , setProfile] = useState({}) ;
   const {userToken } = useContext(UserContext)
   const navigate = useNavigate() ;
   const {id} = useParams() ;
   const header = {
      token:`${process.env.REACT_APP_BEARER_TOKEN} ${userToken || localStorage.getItem("token")}`
   }

      
      async function getProfile(){
         setLoading(true) ;
         await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/profile/${id}` ,  {headers:header} )
         .then(({data})=>{
            if(data.message === "success"){
               setLoading(false) ;
               setProfile(data.profile) ;
               
            }
         })
         .catch((error)=>{
            setLoading(false) ;
            setError(error.response?.data.message)
         })
      }
      
      async function createProfileOrder(){
         setLoading(true) ;
         await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/profile/${id}` , {} ,  {headers:header} )
         .then(({data})=>{
            if(data.message === "success"){
               setLoading(false) ;
               navigate("/order?profile=true") ;
            }
         })
         .catch((error)=>{
            setLoading(false) ;
            setError(error.response?.data.message)
         })
      }

      useEffect(() => {
         getProfile()
      }, [])

   return (
      <>
         <div className="container text-center">
            <CustomTitle title="بروفايلات التحاليل" />

            {loading? 
               <Loading/> 
            : 
               <div>
                  {error? <p className='text-danger'>!...لا يوجد باقات لهذا الاسم </p> : ""}
                  <h1 className='mt-4'>{profile.name}</h1>
                  <div className='row'>
                     <div className='col-md-8 offset-md-2'>
                        <div className={`${style.imageCover} text-center m-auto my-4`}>
                           <img className='w-100 h-100' src={profile.image} alt={profile.name} />
                        </div>
                     </div>


                     <div className="col-md-10 offset-md-1">
                        <div className='m-2 p-2'>
                           <p>{profile.description}</p>
                        </div>
                     </div>

                     <div className="col-md-10 offset-md-1 bg-body-secondary rounded-2 p-2">
                        <h4>التحاليل الموجودة داخل البروفايل </h4>
                        {profile.testItems?.map(({test:{name}})=> <span className='text-primary m-2 fw-bold'>{name}</span>)}
                     </div>
                  </div>

                  <div>
                     <p>سعر  الباقة  بعد الخصم <span className='text-danger fw-bold fs-3 mx-2'>{profile.price} </span> جنية</p>
                  </div>

                  <div>
                     <button onClick={()=>{createProfileOrder()}} className='btn btn-success w-50 m-auto'>أتمام الطلب</button>
                  </div>
               </div>
            }
         </div>
      </>
   )
}
