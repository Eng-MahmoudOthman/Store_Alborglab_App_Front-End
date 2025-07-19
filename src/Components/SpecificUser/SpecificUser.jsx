// ChangeRoleAdmin.jsx
import React, { useContext, useEffect, useRef } from "react";
import avatar from "../../Assets/images/profile1.png"

import style from "./specificUser.module.css" ;
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext.js";




   export default function SpecificUser({user}) {
      const closeBtnRef = useRef() ;



      return (
            <div className="getSpecificUser-container">
               <div className="modal fade" id="getSpecificUser" tabIndex="-1" aria-labelledby="getSpecificUserLabel" aria-hidden="true">
                  <div className="modal-dialog">
                     <div className="modal-content">

                        <div className="modal-header">
                           <h5 className="modal-title" id="getSpecificUserLabel">Team Member</h5>
                           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeBtnRef}></button>
                        </div>

                        <div className="modal-body">
                           <div  className={`${style.divMobileImgCover}`}>
                              <img 
                                 src={user.image?.secure_url || avatar} 
                                 onError={(e) => {
                                    e.target.onerror = null ;   // علشان ميعملش loop
                                    e.target.src = avatar ;     // الصورة الديفولت
                                 }}
                                 className={`${style.imgCover}`}
                                 alt="Cover"
                              />
                           </div>

                           <div className="text-start fw-bold ">
                              <h2 className="text-center main-color fw-bold">{user.name}</h2>
                              <p><span className="fs-5"> Employee Code : </span> {user.employeeCode}</p>
                              <p><span className="fs-5"> Phone Number : </span> {user.phone} </p>
                              <p><span className="fs-5"> Email : </span> {user.email} </p>
                              <p><span className="fs-5"> Branch :  </span> {user.branch?.name} </p>
                              <p><span className="fs-5"> Company :  </span>{user.branch?.company.name} </p>
                              <p><span className="fs-5"> Branch Area :  </span>{user.branch?.branch_area}  </p>
                              <p><span className="fs-5"> Registration At : </span> {user.createdAt}  </p>
                           </div>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
         );
   }





















   



// import React, { useContext, useEffect } from "react";
// import avatar from "../../Assets/images/profile1.png"

// import style from "./specificUser.module.css" ;
// import { useParams } from "react-router-dom";
// import { UserContext } from "../../Context/UserContext.js";




//    export default function SpecificUser() {
//       const {id} = useParams() ;
//       const {getSpecificUser , user} = useContext(UserContext) ;

//       useEffect(() => {
//          getSpecificUser(id)
//       }, [id]);
//       return (
//             <div className="container px-5">
//                <div className="">
//                   <h5 className="main-header" >Team Member</h5>
//                   <div className="modal-body">
//                      <div  className={`${style.divMobileImgCover}`}>
//                         <img 
//                            src={user.image?.secure_url || avatar} 
//                            onError={(e) => {
//                               e.target.onerror = null ;   // علشان ميعملش loop
//                               e.target.src = avatar ;     // الصورة الديفولت
//                            }}
//                            className={`${style.imgCover}`}
//                            alt="Cover"
//                         />
//                      </div>

//                      <div className="text-start">
//                         <h2>{user.name}</h2>
//                         <p>Code : {user.employeeCode}</p>
//                         <p>Phone Number : {user.phone} </p>
//                         <p>Email : {user.email} </p>
//                         <p>Branch : {user.branch?.name} </p>
//                         <p>Company : {user.branch?.company.name} </p>
//                         <p>Branch Area : {user.branch?.branch_area}  </p>
//                      </div>
//                   </div>
//                </div>
//             </div>
//          );
//    }
