import React, { useContext, useState } from 'react'
import { UserContext } from '../../Context/UserContext.js'
import "./userProfile.css"
import avatar from "../../Assets/images/profile1.png"
import Swal from 'sweetalert2'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import CustomTitle from '../CustomTitle/CustomTitle.jsx'

export default function UserProfile() {
   const {role , loggedUser} = useContext(UserContext) ;
   const[showLogo , setShowLogo] = useState(false) ;

   let showImageProfile = ()=>{
      Swal.fire({
         imageUrl: showLogo? avatar :loggedUser.image,
         imageHeight: 460,
         imageAlt: "A tall image"
      });
   }


   return (
      <Fragment>
         <CustomTitle title="الصفحة الشخصية " />
         <div className="container mt-5 homeDashboard">
            <h1 className='main-header'>Profile</h1>
            <div className='under-header'></div>
               <div className='imgCoverProfile m-auto '>
                  <img 
                     onClick={()=>{showImageProfile()}} 
                     src={loggedUser.image || avatar} 
                     onError={(e) => {
                        setShowLogo(true)
                        e.target.onerror = null ; // علشان ميعملش loop
                        e.target.src = avatar ;     // الصورة الديفولت
                     }}
                     className=''
                     alt="Cover"
                  /> 
               </div>

               <div className='text-center my-2'>
                  <Link to="/ChangeUserImage" title='اضغط هنا لتغيير الصورة الشخصية' className='btn btn-sm bg-main'>تغيير الصورة الشخصية<i className="fa-solid fa-camera-rotate ms-2"></i></Link>
               </div>

               <div className='mt-4 main-color fw-bold'>
                  <p className='fs-6'>Name : {loggedUser.name}</p>
                  <p className='fs-6'>Employee Code :{loggedUser.employeeCode}</p>
                  <p className='fs-6'>Email :{loggedUser.email}</p>
                  <p className='fs-6'>Mobile : {loggedUser.phone}</p>
                  <p className='fs-6'>Branch: {loggedUser.branch}</p>
                  {role === "admin" || role === "moderator" ? <p className='fs-6'>User Role : {loggedUser.role}</p> :""}
               </div>
               <div>
                  <Link to={`/UpdateUserProfile`} className='btn btn-sm bg-main w-50 ' >تعديل بياناتى</Link>
               </div>
         </div>
      </Fragment>
   )
}
