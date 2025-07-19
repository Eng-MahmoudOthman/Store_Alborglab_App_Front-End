
import { jwtDecode } from 'jwt-decode';
import React from 'react' ;
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';




// export default function ProtectedOnline(props) {

//    if(localStorage.getItem('provider_token') !== null){
//          return props.children;
//    }else{
//       Swal.fire({
//          title: "Not Authorization Entered" ,
//          text: "Please Try Again Log in now",   
//          icon: "error"
//       });
//       return <Navigate to={'/onlineSystem'}/>
//    }
// }




   export default function ProtectedOnline({ children }) {
      const token = localStorage.getItem('provider_token');

      //& ==== Token Not Exist - التحقق من وجود التوكن ==== :
      if (!token) {
         Swal.fire({
            title: 'Unauthorized',
            text: 'Please log in first.',
            icon: 'error',
         });
         return <Navigate to="/onlineSystem" />;
      }

      //& ==== Check Token Expired Time - التأكد من ان التوكين لسة سارى  :
      try {
         const decoded = jwtDecode(token);
         const currentTime = Date.now() / 1000 ;

         if (decoded.exp < currentTime) {
            localStorage.removeItem('provider_token');
            Swal.fire({
               title: 'Session Expired',
               text: 'Expired token removed from localStorage. Please log in again.',
               icon: 'warning',
            });
            return <Navigate to="/onlineSystem" />;
         }
         return children;


      //& ==== Check Invalid Token ==== :
      } catch (error) {
         localStorage.removeItem('provider_token');
         Swal.fire({
            title: 'Invalid Token',
            text: 'Something went wrong. Please log in again.',
            icon: 'error',
         });
         return <Navigate to="/onlineSystem" />;
      }
   }
