import React, { useContext, useEffect, useState } from 'react'

import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import getGreeting from "../../Utilities/getGreeting.js"
import { UserContext } from '../../Context/UserContext.js';
import axios from 'axios';

import img1 from "../../Assets/slider_Online/slider_online_1.jpg"
import img2 from "../../Assets/slider_Online/slider_online_2.webp"
import img3 from "../../Assets/slider_Online/slider_online_3.jpg"
import img4 from "../../Assets/slider_Online/slider_online_4.jpg"
import img5 from "../../Assets/slider_Online/slider_online_5.webp"
import img6 from "../../Assets/slider_Online/slider_online_6.jpg"
import img7 from "../../Assets/slider_Online/slider_online_7.jpg"


import style from "./mainPage.module.css" ;

export default function MainPage() {
   const {loggedUser , userToken} = useContext(UserContext) ;
   const header = {
      token:`${process.env.REACT_APP_BEARER_TOKEN} ${userToken || localStorage.getItem("token")}`
   }


   const services = [
      { name: "Consumption", icon: ""  , url:"#" , isActive:true}, 
      { name: "Orders", icon: ""  , url:"#" , isActive:false}, 
      { name: "Expired", icon: ""  , url:"#" , isActive:true}, 
      { name: "Members", icon: ""  , url:"#" , isActive:false}, 
      { name: "Received", icon: ""  , url:"#" , isActive:false}, 
      { name: "Transfer", icon: "" , url:"#" , isActive:true}, 
      { name: "Inventory", icon: ""  , url:"#" , isActive:false} ,
      { name: "Exam", icon: ""  , url:"#" , isActive:false}, 
      { name: "Templates", icon: ""  , url:"#" , isActive:false} ,
      { name: "Reports", icon: ""  , url:"#" , isActive:false} 
   ];

   const adverts = [
      { _id: "Consumption", image: img1  , isActive:false}, 
      { _id: "Orders"     , image: img2  , isActive:true} , 
      { _id: "Expired"    , image: img3  , isActive:true} , 
      { _id: "Members"    , image: img4  , isActive:false}, 
      { _id: "Received"   , image: img5  , isActive:false}, 
      { _id: "Transfer"   , image: img6  , isActive:false}, 
      { _id: "Inventory"  , image: img7  , isActive:false},
   ];


   
   return ( 
      <div className=" container main-container"> 

         {/* Info Section with Slider */}
         <section className="home-slider p-3 rounded-2 mb-5">
            <div className='mb-2'>
               <p className=' my-4 text-center fw-bold'>{getGreeting() }</p>
            </div>

            <div className=' bg-light rounded-2 overflow-hidden'>
               <Carousel indicators={true} controls={false} interval={2000} className={style.carouselDiv} >
                  {adverts.map((ele) => (
                     <Carousel.Item key={ele._id} className={`carousel-item ${style.carouselItem}`}>
                        <div className="text-center carousel-div">
                           <img src={ele.image} alt="cover" className={`w-100 carousel-img ${style.carouselImg}`}/>
                        </div>
                     </Carousel.Item>
                  ))}
               </Carousel>
            </div>
         </section>


         {/* Services Grid */}
         <div className="row g-2 bg-body-secondary rounded-2 home-box ">
            {services.map((service, index) => (
               <div key={index} className={`col-6 my-1`}>
                  <Link to={service.isActive?service.url:"#"}>
                     <div className="position-relative">
                        <div className={`card text-center p-2 `}>
                           <p className='m-0 fs-5 fw-bold'>{service.name}</p>
                        </div>
                        {service.isActive? 
                              <i className={`fa-solid fa-bell position-absolute  translate-middle text-danger border border-light fs-6 ${style.notification}`}></i>
                           :
                              ''
                        }
                     </div>
                  </Link>
               </div>
            ))}
         </div>

      </div>
   )
}







