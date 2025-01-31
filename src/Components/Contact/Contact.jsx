import React, { Fragment } from 'react'
import imgShare from "../../Assets/images/share.png" ;
import qrCode from "../../Assets/images/qrCode.png"

import { Link } from 'react-router-dom'

export default function Contact() {
   return (
      <Fragment>
         <div className="container">
            <h1 className='main-header'>Contact Me</h1>
            <div className='under-header'></div>

               <h2 className=" h4 text-center mb-4">Store_App Alborg Laboratory </h2>
               <div className="row">


               <div className="row align-item-center">

                  <div className="col-md-6 text-center">
                     <div className='w-100 text-center '>
                        <img src={imgShare} className='w-100' alt="qrCode" />
                     </div>
                     <p className='text-success'>Share Link </p>
                  </div>

                  <div className="col-md-6 text-center mt-4">
                     <div className='w-100 text-center mb-4'>
                        <img src={qrCode} className='w-50 border border-4 border-danger rounded-2 p-4' alt="qrCode" />
                     </div>
                     <Link to="#" target='_blank' className='text-primary'>Website Link Click Here !</Link>
                     <p className='text-danger'>http://localhost:3000/#/shareWebsite</p>
                  </div>
               </div>



               <div className="col-md-12">
                  <p className="footer-info">
                        يقدم هذا الموقع كل الادوات  المتاحة لتنظيم التعامل مع المواد والخامات المستخدة يوميا فى معامل البرج     
                  </p>
               </div>

               </div>
         </div>
      </Fragment>
   )
}
