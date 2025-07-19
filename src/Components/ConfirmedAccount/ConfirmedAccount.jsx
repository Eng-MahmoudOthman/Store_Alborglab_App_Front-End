import React, { Fragment, useContext, useEffect, useState } from 'react' ;
import { useParams } from 'react-router-dom';
import CustomTitle from '../CustomTitle/CustomTitle.jsx';

import { useFormik } from "formik" ;
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { UserContext } from "../../Context/UserContext.js";
import { logOut } from "../../Utilities/logOut.js";
import notification from '../../Utilities/notification.js';


export default function ConfirmedAccount() {
      const {id} = useParams();
      const navigate = useNavigate();

      const [error , setError] = useState(null)
      const [loading , setLoading] = useState(false)
      const {setRole , setLoggedUser  , setUserToken  , getUserTeam} = useContext(UserContext)
      const totalUserInfo = useContext(UserContext);
   
   

      //& Handle Phone Empty Or Email Empty :
      async function sendOTPCode(){
         await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/send-otp` , {id})
         .then((data)=>{
            notification("success" , data.data.message)
         })
         .catch((error)=>{
            setError(error.response.data.message)
            console.log(error.response.data.message);
            setLoading(false)
         })
      }





      //& Handle Phone Empty Or Email Empty :
      async function submitConfirmed(values){
         values.id = id ;         
         setLoading(true)
         await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/confirm` , values)
         .then(({data})=>{
            //^ Check Login Success User :
            if(data?.message === "Activated Account Successfully"){
               notification("success" , data.message);

               setLoading(false)
               //& save Token In Local Storage And Save Token in Use Context :
               localStorage.setItem("token" , data.token) ;
               setUserToken(data.token) ;

               const token = data.token ;
               const decoded = jwtDecode(token);

               //& Get User Team When Refresh :
               getUserTeam(decoded.branchId) ; 

               setLoggedUser(decoded) ;

               //& Set Main Color From Database :
               document.documentElement.style.setProperty("--main-color" , decoded.color )

               //& Set Role :
               setRole(decoded.role);

               setTimeout(() => {
                  handleLogOut()
               } , (60*60*1000)) ;    
               
               navigate("/home") ;
                  // After 1 hours   logout
                  // 60*10*1000 = 600,000= 10 minute
                  // 60*20*2*1000 = 2400,000= 1/3 hours
                  // 60*60*1000 = 3600,000= 1 hours  
                  // 60*60*2*1000 = 7200,000= 2 hours  
            }else{
               navigate(`/ConfirmedAccount/${data.userId}`) ;
            }
         })
         .catch((error)=>{
            setError(error.response.data.message)
            console.log(error.response.data.message);
            setLoading(false)
         })
      }
   
      let validationSchema = Yup.object({
         OTP:Yup.string().required().trim() ,
      })
   
   
      let formik = useFormik({
         initialValues:{
            OTP:"" 
         } , validationSchema , 
         onSubmit:submitConfirmed
      })


      const handleLogOut = ()=>{
         logOut(navigate , totalUserInfo)
      }




      useEffect(() => {
         sendOTPCode()
      }, [])

   return (
      <Fragment>
         <CustomTitle title="Verify Account" />

         <div className={`container`}>
            <div className="py-5 px-2">
               <h1 className="main-header mb-0">Verify Your Account</h1>
               <p className="sub-title text-center mb-2">Your code was send to you via email</p>
               <p className="sub-title text-center">برجاء إدخال الكود المرسل على ايميل الفرع الخاص بك لتأكيد بياناتك المرسلة   </p>

               <form action="" onSubmit={formik.handleSubmit}>
                  {error?<p className="text-danger">{error}</p> :""}
                  <div className="my-1">
                        <input type="text" 
                           value={formik.values.OTP}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control py-2 ps-3" id="OTP"  
                           name="OTP" 
                           required
                           autoComplete="username"
                           placeholder="Enter OTP Code" />
                        {
                           formik.errors.OTP  && formik.touched.OTP?
                              <div className="text-danger m-0 p-0">{formik.errors.OTP}</div> 
                           : 
                              <p className="text-success m-0 p-0"></p>
                        }
                  </div>

                  <div className="text-center">
                     {loading ? 
                           <button className="btn bg-main text-white w-50"> <i className="fa-solid fa-spinner fa-spin fa-rotate-180 fa-xl"></i></button>
                        : 
                        <>
                           <p className='my-2 text-danger'>يرجى إدخال الكود خلال 10 دقائق من إرسالة </p>
                           <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main btn-sm my-2 rounded-2 w-50">Verify Account</button>
                           {/* <button disabled={false} type="submit" className="btn bg-main btn-sm mx-4 rounded-2">Re-Send OTP</button> */}
                           <p className=''>Don`t Receive Code ?<span className='text-primary btn' onClick={()=>{sendOTPCode()}}>Resend</span></p>
                           <p className={`text-center mt-1`}>Log in to your account Again !<Link className="m-2 main-color" to="/">تسجيل الدخول</Link></p>
                           
                        </>
                     }
                  </div>
               </form>
            </div>
         </div>
      </Fragment>
   )
}
