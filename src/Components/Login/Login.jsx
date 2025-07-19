import { useFormik } from "formik" ;
import { Fragment, useContext , useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { UserContext } from "../../Context/UserContext.js";
import Swal from 'sweetalert2';
import { logOut } from "../../Utilities/logOut.js";
import style from "./login.module.css" ;
import CustomTitle from "../CustomTitle/CustomTitle.jsx";
import notification from "../../Utilities/notification.js";

export default function Login(){

   let navigate = useNavigate()
   const [error , setError] = useState(null)
   const [loading , setLoading] = useState(false)
   const {setRole , setLoggedUser  , setUserToken  , getUserTeam} = useContext(UserContext) ;
   const totalUserInfo = useContext(UserContext) ;
   const [showPassword, setShowPassword] = useState(false) ;





   //& Handle Phone Empty Or Email Empty :
   async function submitLogin(values){
      setLoading(true)
      const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/signIn` , values)
      .catch((error)=>{
         setLoading(false) ;
         setError(error.response.data.message) ;
         notification("error" , error.response.data.message)
      })

      //^ Check Login Success User :
         if(data?.message === "success"){
            setLoading(false)
            //& save Token In Local Storage And Save Token in Use Context :
            localStorage.setItem("token" , data.token) ;
            setUserToken(data.token) ;

            const token = data.token ;
            let decoded = jwtDecode(token);

            //& Get User Team When Refresh :
            getUserTeam(decoded.branchId) ;

            setLoggedUser(decoded) ;
            //& Set Main Color From Database :
            document.documentElement.style.setProperty("--main-color" , decoded.color )

            //& Set Role :
            setRole(decoded.role);

            if(decoded.role === "user"){
               navigate("/home") ;
            }

            setTimeout(() => {
               handleLogOut()
            } , (60*60*1000)) ;    

            // After 1 hours   logout
                                 // 60*10*1000 = 600,000= 10 minute
                                 // 60*20*2*1000 = 2400,000= 1/3 hours
                                 // 60*60*1000 = 3600,000= 1 hours  
                                 // 60*60*2*1000 = 7200,000= 2 hours  
         }else if(data.message === "Should be Confirmed Account!"){
            navigate(`/ConfirmedAccount/${data.userId}`) ;
         }else{
            navigate("/register") ;
         }
      }



   //& Handle Log Out :
   function  handleLogOut(){
      logOut(navigate , totalUserInfo) ;
      Swal.fire({
         title:"Session Expired !" ,
         text: "Session Expired .Please Try Log in Again !!" ,   
         icon: "error"
      });
   }






   let validationSchema = Yup.object({
      employeeCode:Yup.string().required().trim() ,
      password:Yup.string().required().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]?).{7,}$/ , "should be Password Start UpperCase And Contain 8 Character And Contain any (@#$%&*)") ,
   })


   let formik = useFormik({
      initialValues:{
         employeeCode:"" ,
         password:"" ,
      } , validationSchema , 
      onSubmit:submitLogin
   })


   return (
      <Fragment>
         <CustomTitle title="Login" />

         <div className={`container-fluid ${style.login_container}`}>
            <div className="row">
               <div className="col-md-8 offset-md-2  p-0">
                  <div className=" w-100 p-3">
                     <h1 className="main-header">Login</h1>
                     <p dir="rtl" className="sub-title text-center">سعيد بحضورك مرة تانية 😍</p>
                     <p className="sub-title text-center">برجاء إدخال الكود الوظيفى وكلمة المرور  </p>

                     <form action="" onSubmit={formik.handleSubmit}>

                        {error?<p className="text-danger">{error}</p> :""}

                        <div className="my-4 position-relative">
                           <i className="fas fa-user icon-input-field"></i>
                           <label htmlFor="employeeCode" className="form-label required">Enter  Employee Code</label>
                           <input type="text" 
                              value={formik.values.employeeCode}
                              onChange={formik.handleChange} 
                              onBlur={formik.handleBlur}
                              className="form-control rounded-0" id="employeeCode"  
                              name="employeeCode" 
                              required
                              autoComplete="username"
                              placeholder="Employee Code" />
                           {
                              formik.errors.employeeCode  && formik.touched.employeeCode?
                                 <div className="text-danger m-0 p-0">{formik.errors.employeeCode}</div> 
                                 : 
                                 <p className="text-success m-0 p-0"></p>
                           }
                        </div>

                        <div className="my-4 position-relative">
                           <i className="fas fa-lock icon-input-field"></i>
                           <label htmlFor="password" className="form-label required">Enter Password</label>
                           <input  type={showPassword ? "text" : "password"}
                              value={formik.values.password}
                              onChange={formik.handleChange} 
                              onBlur={formik.handleBlur}
                              className="form-control rounded-0" id="password"  
                              name="password" 
                              required
                              autoComplete="current-password"
                              placeholder="Password" 

                              /** ==== Prevent Copy , Cut , paste , Right Click ==== */
                              onCopy={(e) => e.preventDefault()}
                              onPaste={(e) => e.preventDefault()}
                              onCut={(e) => e.preventDefault()}
                              onContextMenu={(e) => e.preventDefault()}
                              />
                           {
                              formik.errors.password && formik.touched.password?
                                 <p className="text-danger m-0 p-0">{formik.errors.password}</p> 
                                 : 
                                 <p className="text-success m-0 p-0"></p>
                           }

                           {showPassword ? (
                              <i className="fas fa-eye toggle-password" onClick={() => setShowPassword(false)}></i>
                           ) : (
                              <i className="fas fa-eye-slash toggle-password" onClick={() => setShowPassword(true)}></i>
                           )}
                        </div>

                        <div className="d-grid gap-2 col-8 mx-auto">
                           {loading ? 
                                 <button className="btn bg-main text-white  mt-2"> <i className="fa-solid fa-spinner fa-spin fa-rotate-180 fa-xl"></i></button>
                              : 
                                 <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main  mt-2 rounded-0">Log in</button>
                           }

                           <div className="mt-2">
                              <p className={`${style.register_text} text-center mt-1`}><Link className="m-1 main-color" to="/ForgetPassword" ><i className="fa-solid fa-lock me-2"></i>Forget Password ?</Link></p>
                              <p className="login-text text-center mt-1"> Register Account !<Link className="m-2 main-color" to="/register" >إنشاء حساب</Link></p>
                           </div>
                        </div>

                     </form>

                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   )
} 
