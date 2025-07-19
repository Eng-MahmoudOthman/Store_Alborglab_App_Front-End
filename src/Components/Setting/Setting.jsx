import React, { useContext } from 'react'
import "./setting.css"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext.js';
import { logOut } from '../../Utilities/logOut.js';
import CustomTitle from '../CustomTitle/CustomTitle.jsx';








export default function Setting() {
   
   const navigate = useNavigate() ;
   const totalUserInfo = useContext(UserContext);

   const services = [
      {name:"Change Color" , url:"/ChangeColor" , icon:<i className="fa-solid fa-heart-pulse"></i>} ,
      {name:"Change Password" , url:"/ChangePassword" , icon:<i className="fa-solid fa-lock"></i>} ,
      {name:"Contact Me" , url:"/DevelopedInformation" , icon:<i className="fa-solid fa-phone"></i>} ,
      {name:"Language " ,  click:""  , icon:<i className="fa-solid fa-earth-americas"></i>} ,
      {name:"Change Style" , url:"" , icon:<i className="fa-solid fa-wallet"></i>} ,
      {name:"Log Out" , click:handleLogOut , icon:<i className="fa-solid fa-right-from-bracket"></i>} ,
   ]



   
   //& Handle Log Out :
   function handleLogOut(){
      logOut(navigate , totalUserInfo) ;
   }


   return (
      <>
         <div className="container setting-container vh-75 mt-5 bt-5">
            <CustomTitle title="الاعدادات" />
            <h1 className='main-header'>Setting Page</h1>
            <div className='my-5 text-center '>
               <Link to="/yourTeam" className='btn btn-success w-75'>عرض فريق العمل </Link>
            </div>

            <div className="row btn-group" dir='rtl'>
               {services.map((ele , index)=>
                  <div key={index} className="col-6 col-md-4">
                     <div className='p-1'>
                        <Link to={ele.url?ele.url:""} onClick={ele.click?()=>{ele.click()}:""}  className='btn btn-secondary w-100 border-0'>
                           <div className='d-flex justify-content-between align-items-center'>
                              {ele.icon}
                              <span className='text-box-more'>{ele.name}</span>
                           </div>
                        </Link>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </>
   )
}
