import React, { Fragment, useContext, useState } from 'react';

import style from "./yourTeam.module.css" ;
import { UserContext } from '../../Context/UserContext.js';
import SpecificUser from '../SpecificUser/SpecificUser.jsx';
// import SpecificUser from '../SpecificUser/SpecificUser.jsx';

export default function YourTeam() {
   const {team} = useContext(UserContext) ;
   const [userTeam , setUserTeam] = useState({});


   const handleUserTeam =  (user)=>{
      setUserTeam(user)
   } ;
   return (
      <Fragment>
         <div className='container'>
            <h1 className='main-header'>Team Member Options</h1>
            <div className='mt-5 '>
               {team.length > 0 ? 
                  team.map((ele)=>
                     <div onClick={()=>{handleUserTeam(ele)}} className="card my-2 btn border-main" style={{maxWidth: 540}} data-bs-toggle="modal" data-bs-target="#getSpecificUser">
                           <div className="row p-1 align-items-center" >
                              <div className="col-3">
                                 <img src={ele?.image?.secure_url} className={`img-fluid rounded-start  ${style.cardImage}`} alt="..." />
                              </div>

                              <div className="col-9 p-0">
                                 <div className={`card-body p-0 ${style.text}`}>
                                    <h6 className="card-title p-0 m-0">{ele.name} </h6>
                                    <p className="card-text p-0 m-0">Branch : {ele.branch?.name} </p>
                                    <p className="card-text p-0 m-0"><small className="text-body-secondary">Last Created {ele.createdAt}</small></p>
                                 </div>
                              </div>
                           </div>
                     </div>
                  ) 
                  : 
                  <h4>Not Exist Team Member. !</h4>
               }
            </div>
               <SpecificUser user={userTeam}/>
         </div>
      </Fragment>
   )
}








// import React, { Fragment, useContext } from 'react';

// import style from "./yourTeam.module.css" ;
// import { UserContext } from '../../Context/UserContext.js';
// import { Link } from 'react-router-dom';

// export default function YourTeam() {
//    const { team} = useContext(UserContext) ;


//    return (
//       <Fragment>
//          <div className='container'>
//             <h1 className='main-header'>Team Member Options</h1>
//             <div className='mt-5 '>
//                {team.length > 0 ? 
//                   team.map((ele)=>
//                      <div key={ele._id} className="card my-2">
//                         <Link to={`/SpecificUser/${ele._id}`} className='text-black'>
//                            <div className="row p-1 align-items-center" >
//                               <div className="col-3">
//                                  <img src={ele?.image?.secure_url} className={`img-fluid rounded-start  ${style.cardImage}`} alt="..." />
//                               </div>

//                               <div className="col-9 p-0">
//                                  <div className={`card-body p-0 ${style.text}`}>
//                                     <h6 className="card-title p-0 m-0">{ele.name} </h6>
//                                     <p className="card-text p-0 m-0">Branch : {ele.branch?.name} </p>
//                                     <p className="card-text p-0 m-0"><small className="text-body-secondary">Last Created {ele.createdAt}</small></p>
//                                  </div>
//                               </div>
//                            </div>
//                         </Link>
//                      </div>
//                   ) 
//                   : 
//                   <h4>Not Exist Team Member. !</h4>
//                }
//             </div>
//          </div>
//       </Fragment>
//    )
// }



