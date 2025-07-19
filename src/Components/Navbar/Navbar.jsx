import {Fragment, useContext} from "react" ;
import { Link } from "react-router-dom" ;
import avatar from "../../Assets/images/profile1.png"
import { UserContext } from "../../Context/UserContext.js";
import style from "./navbar.module.css"
import isTokenValid from "../../Utilities/checkToken.js";

export default function Navbar(){
   const {loggedUser ,  userToken  , team} = useContext(UserContext) ;

   return (
      <Fragment>
         <div className="navbar-mobile-bottom">
            {userToken && loggedUser && isTokenValid(userToken)? 
               <>
                  {/* Header */}
                  <div className="fixed-top p-2 bg-white border-0">
                     <header className="p-2 text-white bg-body-tertiary rounded">
                        <div className='row align-items-center'>
                           
                           <div  className={`col-3 ${style.divMobileImgCover}`}>
                              <Link to="/UserProfile">
                                 <img 
                                    src={loggedUser.image || avatar} 
                                    onError={(e) => {
                                       e.target.onerror = null ;   // علشان ميعملش loop
                                       e.target.src = avatar ;     // الصورة الديفولت
                                    }}
                                    className={`${style.imgCover}`}
                                    alt="Cover"
                                    />
                              </Link>
                           </div>

                           <div className="col-7">
                              <p className={`m-0 p-0 text-black ${style.info}`}>{loggedUser?.name?.toLowerCase().split(" ").map(word => word.charAt(0)?.toUpperCase() + word.slice(1)).slice(0,2).join(" ")}</p>
                              <p className={`m-0 p-0 text-black ${style.info}`}>{loggedUser.branch}</p>
                              <p className={`m-0 p-0 text-black ${style.info}`}>{loggedUser.branchArea}</p>
                           </div>

                           <div  className="col-2 m-0  text-center">
                              <Link to="/yourTeam" className="main-color">
                                 <i class={`fa-solid fa-users-line ${style.iconTeam}`}></i>
                                 <p className={`m-0 text-center ${style.team}`}>Team:{team.length || 0}</p>
                              </Link>
                           </div>

                        </div>
                     </header>
                  </div>

                  {/* Navbar Mobile Position Bottom  */}
                  <nav className={`navbar bg-main fixed-bottom py-1 m-0 mx-1 ${style.sidebar}`}> 
                     <div className="container-fluid d-flex justify-content-between"> 

                           <Link to="/Consumption" className={`text-center ${style.consumptionIcon}`}>
                              <i className="fa-solid fa-cart-plus "></i> 
                              <p className="m-0">Consumption</p>
                           </Link>


                           <Link to="/home" className={`text-center  ${style.mainIcon}`}>
                              <i className="fa-solid fa-house-user "></i> 
                              {/* <p className="m-0">Main</p>  */}
                           </Link>


                           <Link to="/Setting" className={`text-center ${style.settingIcon}`}>
                              {/* <i className="fa-solid fa-ellipsis "></i> */}
                              {/* <i class="fa-solid fa-gear"></i> */}
                              <i class="fa-solid fa-bars"></i>
                              <p className="m-0">Settings</p> 
                           </Link>

                     </div> 
                  </nav>
               </>
               : ""
            }
         </div>
      </Fragment>
   )
}