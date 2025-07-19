import axios from "axios";
import { useFormik } from "formik" ;
import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import style from "./register.module.css" ;
import CustomTitle from "../CustomTitle/CustomTitle.jsx";
import { CompanyContext } from "../../Context/CompanyContext.js";
import { BranchContext } from "../../Context/BranchContext.js";


export default function Register(){

   const navigate = useNavigate() ;
   const{getCompanies , companies , setCompanies , company , setCompany} = useContext(CompanyContext);
   const{getAllBranches , branches} = useContext(BranchContext);
   const [error , setError] = useState(null) ;
   const [loading , setLoading] = useState(false) ;
   const [showBranches, setShowBranches] = useState(false) ;
   const [showPassword, setShowPassword] = useState(false) ;




   async function submitRegister(values){
      setLoading(true)
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/signUp` , values)
      .then(({data})=>{
         if(data.message === "success"){
            setLoading(false)
            navigate("/")
         }
      })
      .catch((error)=>{
         setError(error.response.data.message)
         console.log(error.response.data.message);
         setLoading(false)
      })
   }

   let validationSchema = Yup.object().shape({
      name:Yup.string().min(2 , "Name Should be More than 2").max(100 , "Name less than 100").required("Name is Required").trim() ,
      employeeCode:Yup.string() ,
      branch:Yup.string() ,
      phone:Yup.string().required().matches(/^01[0125][0-9]{8}$/).trim() ,
      email:Yup.string().email().required().trim() ,
      password:Yup.string().required().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]?).{8,}$/ , "Should be Password Start UpperCase And Contain 8 Character And Contain any (@#$%&*)") ,
      rePassword:Yup.string().oneOf([Yup.ref("password")]  , "rePassword Should be Same Password").required() ,
   })

   let formik = useFormik({
      initialValues:{
         name:"" ,
         employeeCode:"" ,
         branch:"" ,
         phone:"" ,
         email:"" ,
         password:"" ,
         rePassword:"" 
      } , validationSchema , 
      onSubmit:submitRegister
   })


   const handleGetBranches = (companyId)=>{
      getAllBranches(companyId) ;
      setShowBranches(true) ;
   }


   useEffect(() => {
      getCompanies()
   }, [])


   return (
      <Fragment>
         <CustomTitle title="إنشاء حساب جديد" />
         <div className="register-container p-3 m-auto">
            <h1 className="main-header">إنشاء حساب جديد</h1>
            <p className="sub-title text-center">برجاء إدخال البيانات الصحيحة</p>

            <div className="row">
               <div className="col-md-8 offset-md-2">
                  <form action="" onSubmit={formik.handleSubmit}>
                     {error?<div className="alert alert-danger w-75  my-4">{error}</div> :""}

                     <div className="my-4 position-relative">
                        <i className="fas fa-user icon-input-field"></i>
                        <label htmlFor="name" className="form-label required">Enter User Name</label>
                        <input type="text" 
                           value={formik.values.name}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control" id="name"  
                           name="name" 
                           required
                           placeholder="اسم المستخدم ثلاثى" />
                        {formik.errors.name && formik.touched.name?<div className="text-danger m-0 p-0">{formik.errors.name}</div> :""}
                     </div>


                     <div className="my-4 position-relative">
                        <i className="fa-solid fa-envelope-circle-check icon-input-field"></i>
                        <label htmlFor="employeeCode" className="form-label required">Enter Employee Code</label>
                        <input type="employeeCode" 
                           value={formik.values.employeeCode}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control" id="employeeCode"  
                           name="employeeCode" 
                           required
                           placeholder="الكود الوظيفى" />
                        {formik.errors.employeeCode  && formik.touched.employeeCode?<div className="text-danger m-0 p-0">{formik.errors.employeeCode}</div> :""}
                     </div>


                     <div className="my-4 position-relative">
                        <i className="fa-solid fa-envelope-circle-check icon-input-field"></i>
                        <label htmlFor="email" className="form-label required">Enter User Email</label>
                        <input type="email" 
                           value={formik.values.email}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control" id="email"  
                           name="email" 
                           required
                           placeholder=" البريد الإلكترونى" />
                        {formik.errors.email  && formik.touched.email?<div className="text-danger m-0 p-0">{formik.errors.email}</div> :""}
                     </div>


                     <div className="my-4 position-relative">
                        <i className="fa-solid fa-mobile-screen-button icon-input-field"></i>
                        <label htmlFor="phone" className="form-label required">Enter User Phone</label>
                        {/* <input type="tel"  */}
                        <input type="text" 
                           value={formik.values.phone}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control" id="phone"  
                           name="phone" 
                           required
                           placeholder="01X XXX XXX XX" />
                        {formik.errors.phone && formik.touched.phone?<div className="text-danger m-0 p-0">{formik.errors.phone}</div> :""}
                     </div>


                     <div className="my-4 position-relative">
                        <i className="fa-solid fa-mobile-screen-button icon-input-field"></i>
                        <label htmlFor="company" className="form-label required">Enter Company</label>
                        <select className="form-control" name="" id="" required onChange={(e)=>{handleGetBranches(e.target.value)}}>
                           <option value="" selected>Choose Company</option>
                           {companies.length > 0 ? companies.map((ele)=>
                              <option value={ele._id}>{ele.name}</option>
                           ) : ""}
                        </select>
                     </div>


                     <div className="my-4 position-relative">
                        <i className="fa-solid fa-mobile-screen-button icon-input-field"></i>
                        <label htmlFor="branch" className="form-label required">Enter Branch</label>
                           <select value={formik.values.branch}
                              onChange={formik.handleChange} 
                              onBlur={formik.handleBlur}
                              className="form-control" id="branch"  
                              name="branch" 
                              required>
                              <option value="" selected>Choose Specific Branch</option>
                              {branches.length > 0 && showBranches ? branches.map((ele)=>
                                 <option value={ele._id}>{ele.name}</option>
                              ) : ""}
                           </select>
                        {formik.errors.branch && formik.touched.branch?<div className="text-danger m-0 p-0">{formik.errors.branch}</div> :""}
                     </div>


                     <div className="my-4 position-relative">
                        <i className="fas fa-lock icon-input-field"></i>
                        <label htmlFor="password" className="form-label required">Enter Password</label>
                        <input type={showPassword ? "text" : "password"} 
                           value={formik.values.password}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control" id="password"  
                           name="password" 
                           required
                           autoComplete="new-password"
                           placeholder="كلمة المرور" 
                           
                           /** ==== Prevent Copy , Cut , paste , Right Click ==== */
                           onCopy={(e) => e.preventDefault()}
                           onPaste={(e) => e.preventDefault()}
                           onCut={(e) => e.preventDefault()}
                           onContextMenu={(e) => e.preventDefault()}
                        />
                        {formik.errors.password && formik.touched.password?<div className="text-danger m-0 p-0">{formik.errors.password}</div> :""}

                        {showPassword ? (
                              <i className="fas fa-eye toggle-password" onClick={() => setShowPassword(false)}></i>
                           ) : (
                              <i className="fas fa-eye-slash toggle-password" onClick={() => setShowPassword(true)}></i>
                           )
                        }
                     </div>


                     <div className="my-4 position-relative">
                        <i className="fa-solid fa-unlock-keyhole  icon-input-field"></i>
                        <label htmlFor="rePassword" className="form-label required">Re Password</label>
                        <input type={showPassword ? "text" : "password"} 
                           value={formik.values.rePassword}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control" id="rePassword"  
                           name="rePassword" 
                           required
                           autocomplete="new-password"
                           placeholder="تأكيد كلمة المرور" 
                           
                           /** ==== Prevent Copy , Cut , paste , Right Click ==== */
                           onCopy={(e) => e.preventDefault()}
                           onPaste={(e) => e.preventDefault()}
                           onCut={(e) => e.preventDefault()}
                           onContextMenu={(e) => e.preventDefault()}
                           />
                        {formik.errors.rePassword && formik.touched.rePassword?<div className="text-danger m-0 p-0">{formik.errors.rePassword}</div> :""}
                     </div>


                     <div className="d-grid gap-2 col-8 mx-auto">
                        {loading ? 
                              <button className="btn bg-main text-white mt-2"> <i className="fa-solid fa-spinner fa-spin fa-rotate-180 fa-xl"></i></button>
                           : 
                              <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white mt-2">إنشاء حساب</button>
                        }
                        <p className={`${style.login_text} text-center mt-1`}>Log in to your account !<Link className="m-2 main-color" to="/">تسجيل الدخول</Link></p>
                     </div>
                     
                  </form>
               </div>
            </div>

         </div>
      </Fragment>
   )
} 