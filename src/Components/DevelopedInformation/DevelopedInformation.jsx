import React, { Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import CustomTitle from '../CustomTitle/CustomTitle.jsx';
import qrCode from "../../Assets/images/qrCode.png" ;
import { UserContext } from '../../Context/UserContext.js';
import isTokenValid from '../../Utilities/checkToken.js';


export default function DevelopedInformation() {
      const {loggedUser ,  userToken  , team} = useContext(UserContext) ;

      const [copied, setCopied] = useState(false);
      const textToCopy = process.env.REACT_APP_FRONT_URL;
   
      const handleCopy = async () => {
         try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000); // يرجع الزر تاني بعد ٢ ثانية
         } catch (err) {
            console.error("Failed to copy: ", err);
         }
      };




      const developedTeam = [
         { name: "Eman Magdy Sayed", phone: "01123444323"  , title:"UI-UX Design" }, 
         { name: "Zahraa Zein Haussen", phone: "01098767564"  , title:"UI-UX Design" }, 
         { name: "Mahmoud Othman Abo Baker", phone: "01126999142"  , title:"Full Stack Developer" }, 
      ];
      return (
         <Fragment>
            <CustomTitle title="Developers " />
   
            <div className="container ">
               <h1 className='main-header'>Developed Team</h1>
               <div className='under-header'></div>
               
               <div className="container my-4">
                  <section dir='rtl' style={{backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', maxWidth: 800, margin: 'auto', fontFamily: '"Segoe UI", sans-serif', color: '#333'}}>
                     <h2 style={{textAlign: 'center', color: '#2c3e50', marginBottom: '1rem'}}>كلمة شكر وتقدير</h2>
                     <p style={{lineHeight: '1.8', fontSize: '1.1rem'}}>
                        يتقدم فريق العمل المكون من كيميائيين برج العياط وهم :
                     </p>
                     <ul style={{listStyle: 'none', padding: 0, fontSize: '1.1rem'}}>
                        <li>🔹 <strong>إيمان مجدي سيد</strong></li>
                        <li>🔹 <strong>زهراء زينهم حسين</strong></li>
                        <li>🔹 <strong>محمود عثمان أبو بكر</strong> <span style={{color: '#888'}}>(مصمم الموقع)</span></li>
                     </ul>
                     <p style={{lineHeight: '1.8', fontSize: '1.1rem', marginTop: '1rem'}}>
                        بخالص الشكر والتقدير للدكتور <strong>عماد الدين </strong>، مدير منطقة الهرم وتحت قيادة الدكتورة <strong> سوزان شاكر </strong>  على دعمه المتواصل وتشجيعه
                        الدائم لنا خلال فترة إدارته.
                     </p>
                     <p style={{lineHeight: '1.8', fontSize: '1.1rem'}}>
                        لقد كان لدعمه وتوجيهاته الأثر الكبير في تحفيزنا وتطوير مهاراتنا، مما أتاح لنا العمل بروح الفريق وإنجاز هذا الموقع الإلكتروني، 
                        والذي قام بتصميمه محمود عثمان بمشاركة فعالة من الزملاء في جمع وتنسيق المحتوى.
                     </p>
                     <p style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#2c3e50', marginTop: '1.5rem'}}>
                        كل الشكر والعرفان لحضرتك، ونتمنى لكم دوام النجاح والتوفيق.
                     </p>
                  </section>

                  {developedTeam.map((ele)=>
                     <div key={ele.name} className="card shadow-sm border-0 m-2">
                        <div className="card-body">
                           <h5 className="card-title fw-bold">{ele.name}</h5>
                           <p className="card-text ms-3 mb-1" >
                              <i class="fa-solid fa-phone me-2"></i>  Phone : {ele.phone}   
                           </p>
                           <p className="card-text ms-3 mb-1">
                              <i class="fa-solid fa-user me-2"></i> Role : {ele.title}
                           </p>
                        </div>
                     </div>
                  )}
               </div>



               <div className="row align-item-center">
                  <div className="col-md-6 text-center mt-4">
                     <div className='w-100 text-center mb-4'>
                        <img src={qrCode} className='w-50 barcode-box rounded-2 p-4' alt="qrCode" />
                     </div>
                     <Link to={process.env.REACT_APP_FRONT_URL} target='_blank' className='text-primary'>Website Link Click Here !</Link>
                  </div>

                  <div className="text-center">
                     <p>{textToCopy}</p>
                     <button onClick={handleCopy} className="btn btn-success">
                        {copied ? "✔️ تم النسخ" : "📋 نسخ الرابط "}
                     </button>
                  </div>

                  {loggedUser && userToken && isTokenValid(userToken) ? 
                        "" 
                     :
                        <div className='text-center'>
                           <Link to="/" className='btn bg-main my-4 '><i class="fa-regular fa-circle-left"></i> الرجوع لصفحة تسجيل الدخول</Link>
                        </div>
                  }
               </div>


            </div>
         </Fragment>
      )
   }
   