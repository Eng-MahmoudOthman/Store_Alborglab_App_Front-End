import React, { Fragment, useContext, useEffect, useState } from 'react' ;
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from "./profileSlider.module.css" ;

import { UserContext } from '../../Context/UserContext.js';
import axios from 'axios';
import { Link } from 'react-router-dom';








export default function ProfileSlider() {

      const {userToken } = useContext(UserContext) ;
      const [profiles , setProfiles] = useState([]) ;
      const header = {
         token:`${process.env.REACT_APP_BEARER_TOKEN} ${userToken || localStorage.getItem("token")}`
      }
   
   
      //& Get Test Data and Current Page :
      const getData = async()=>{
         await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/profile`  ,  {headers:header})
         .then(({data})=>{
            setProfiles(data?.profiles) ;
         })
         .catch((error)=>{
            console.log(error.response.data.message);
         })
      }
   

      
   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4 ,   // ✅ عدد الشرايح اللي تظهر في نفس الوقت
      slidesToScroll: 1 ,
      arrows: true,      // ✅ إظهار الأسهم
      autoplay: true,              // ✅ تشغيل التحريك التلقائي
      autoplaySpeed: 2000,         // ✅ المدة بين كل تحريك (بالملي ثانية)
      responsive: [
         {
            breakpoint: 500, // موبايلات صغيرة
            settings: {
               slidesToShow: 2,
            }
         },
      ]
   };

   useEffect(() => {
      getData()
   }, [])
   return (
      <Fragment>
         <div className="p-4">
            {profiles.length > 0 && 
               <Slider {...settings}>
                  {profiles.map((item) => (
                     item.isActive? 
                        <Link to={`/ShowAnalysisProfile/${item._id}`}  key={item._id}>
                           <div className="px-2">
                              <div className={`${style.card} border border-1 `}>
                                 <img src={item.image} alt={item.name} className={`${style.imageSlider}`} />
                                 <p className={`${style.title} text-black text-center m-0 p-1 bg-body-tertiary`}>{item.name}</p>
                              </div>
                           </div>
                        </Link> 
                     :""
                  ))}
               </Slider>
            }
         </div>
      </Fragment>

   );
};