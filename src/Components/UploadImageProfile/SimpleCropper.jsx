import React, { useState } from "react";
import Cropper from "react-easy-crop";
import axios from "axios";
import { useFormik } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';  // تأكد من استيراد الـ Bootstrap

export default function SimpleCropper() {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const cropImage = async () => {
    const img = new Image();
    img.src = image;
    await new Promise((r) => (img.onload = r));

    const canvas = document.createElement("canvas");
    canvas.width = 236;
    canvas.height = 236;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      img,
      croppedArea.x,
      croppedArea.y,
      croppedArea.width,
      croppedArea.height,
      0,
      0,
      236,
      236
    );

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg")
    );
    return blob;
  };

  const sendData = async (values) => {
    console.log("إرسال البيانات:", values);

    // قص الصورة أولاً
    const croppedBlob = await cropImage();

    // إنشاء FormData لرفع الصورة
    const formData = new FormData();
    formData.append("file", croppedBlob, "cropped.jpg");

    // إرسال الصورة إلى السيرفر باستخدام axios
    try {
      const response = await axios.patch("http://localhost:5000/api/v1/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `MahmoudOthman_Fekrah_App eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODA2OGUxOTdlYWQ3ZDBiNWM5NGE1OWQiLCJuYW1lIjoibWFobW91ZCBvdGhtYW4gYWJvIGJha2VyIiwicm9sZSI6InVzZXIiLCJwaG9uZSI6IjAxMTE5MjkzNDQzIiwiYmlydGhEYXkiOiIxOTkwLTEyLTEyVDAwOjAwOjAwLjAwMFoiLCJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiYWdlIjozNCwiaW1nQ292ZXIiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAvdXNlcnMvODc4OTdAMzMgLSBDb3B5LmpwZyIsImlhdCI6MTc0NjUyMTkyNiwiZXhwIjoxNzQ2NTI1NTI2fQ.jVoqnSrfq4xbD1Gpm_UgVflzP3nfIsbPU8ij7ETs5R0`,
        },
      });
      console.log("تم رفع الصورة:", response.data);
    } catch (error) {
      console.error("فشل رفع الصورة:", error);
    }
  };

  // استخدام Formik لإدارة النموذج
  const formik = useFormik({
    initialValues: {
      file: null, // هنا هنخزن الصورة اللي بيتم رفعها
    },
    onSubmit: sendData,
  });

  return (
    <div className="container mt-5">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            اختر صورة
          </label>
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={(e) => {
              formik.setFieldValue("file", e.target.files[0]);
              handleFile(e);
            }}
            className="form-control"
          />
        </div>

        {image && (
          <>
            <div
              className="mb-3"
              style={{
                width: 300,
                height: 300,
                position: "relative",
              }}
            >
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          </>
        )}

        <div className="mt-4">
          <button type="submit" className="btn btn-success">
            إرسال
          </button>
        </div>
      </form>
    </div>
  );
}




// import React, { useState } from "react";
// import Cropper from "react-easy-crop";
// import axios from "axios";
// import { useFormik } from "formik";

// export default function SimpleCropper() {
//   const [image, setImage] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedArea, setCroppedArea] = useState(null);
//   const [result, setResult] = useState(null);

//   const onCropComplete = (_, croppedAreaPixels) => {
//     setCroppedArea(croppedAreaPixels);
//   };

//   const handleFile = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => setImage(reader.result);
//     reader.readAsDataURL(file);
//   };

//   const cropImage = async () => {
//     const img = new Image();
//     img.src = image;
//     await new Promise((r) => (img.onload = r));

//     const canvas = document.createElement("canvas");
//     canvas.width = 236;
//     canvas.height = 236;
//     const ctx = canvas.getContext("2d");

//     ctx.drawImage(
//       img,
//       croppedArea.x,
//       croppedArea.y,
//       croppedArea.width,
//       croppedArea.height,
//       0,
//       0,
//       236,
//       236
//     );

//     const blob = await new Promise((resolve) =>
//       canvas.toBlob(resolve, "image/jpeg")
//     );

//     const croppedImg = URL.createObjectURL(blob);
//     setResult(croppedImg);

//     // سيتم رفع الصورة في onSubmit
//     return blob;
//   };


//   const sendData =  async (values) => {
//     console.log("إرسال البيانات:", values);
    
//     // قص الصورة أولاً
//     const croppedBlob = await cropImage();

//     // إنشاء FormData لرفع الصورة
//     const formData = new FormData();
//     formData.append("file", croppedBlob, "cropped.jpg");

//     // إرسال الصورة إلى السيرفر باستخدام axios
//     try {
//       const response = await axios.patch("http://localhost:5000/api/v1/users", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           token:`MahmoudOthman_Fekrah_App eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODA2OGUxOTdlYWQ3ZDBiNWM5NGE1OWQiLCJuYW1lIjoibWFobW91ZCBvdGhtYW4gYWJvIGJha2VyIiwicGhvbmUiOiIwMTExOTI5MzQ0MyIsImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImJpcnRoRGF5IjoiMTk5MC0xMi0xMlQwMDowMDowMC4wMDBaIiwiYWdlIjozNCwiaW1nQ292ZXIiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAvdXNlcnMvMTExMzlwcm9maWxlLmpwZyIsImlhdCI6MTc0NjUyMTM4NSwiZXhwIjoxNzQ2NTI0OTg1fQ.KtcgECgXF5hr0mqw1ocMRZJJvzyj65ArTnNevgdyo6w`,  // إضافة التوكن هنا
//         },
//       });
//       console.log("تم رفع الصورة:", response.data);
//     } catch (error) {
//       console.error("فشل رفع الصورة:", error);
//     }
//   }

//   // استخدام Formik لإدارة النموذج
//   const formik = useFormik({
//     initialValues: {
//       file: null, // هنا هنخزن الصورة اللي بيتم رفعها
//     },
//     onSubmit:sendData,
//   });

//   return (
//     <div style={{ padding: 20 }}>
//       <form onSubmit={formik.handleSubmit}>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             formik.setFieldValue("file", e.target.files[0]);
//             handleFile(e);
//           }}
//         />
//         <br />
//         {image && (
//           <>
//             <div
//               style={{
//                 width: 300,
//                 height: 300,
//                 position: "relative",
//                 marginTop: 20,
//               }}
//             >
//               <Cropper
//                 image={image}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={1}
//                 onCropChange={setCrop}
//                 onZoomChange={setZoom}
//                 onCropComplete={onCropComplete}
//               />
//             </div>
//             <button
//               type="button"
//               style={{ marginTop: 10 }}
//             >
//               قص الصورة
//             </button>
//           </>
//         )}

//         {result && (
//           <div style={{ marginTop: 20 }}>
//             <h4>النتيجة:</h4>
//             <img src={result} alt="cropped" width={236} height={236} />
//           </div>
//         )}

//         <br />
//         <button type="submit">إرسال</button>
//       </form>
//     </div>
//   );
// }









































































// import React, { useState } from "react";
// import Cropper from "react-easy-crop";
// import axios from "axios";



// function SimpleCropper() {
//   const [image, setImage] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedArea, setCroppedArea] = useState(null);
//   const [result, setResult] = useState(null);

//   const onCropComplete = (_, croppedAreaPixels) => {
//     setCroppedArea(croppedAreaPixels);
//   };

//   const handleFile = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => setImage(reader.result);
//     reader.readAsDataURL(file);
//   };


//   const cropImage = async () => {
//     const img = new Image();
//     img.src = image;
//     await new Promise((r) => (img.onload = r));
  
//     const canvas = document.createElement("canvas");
//     canvas.width = 236;
//     canvas.height = 236;
//     const ctx = canvas.getContext("2d");
  
//     ctx.drawImage(
//       img,
//       croppedArea.x,
//       croppedArea.y,
//       croppedArea.width,
//       croppedArea.height,
//       0,
//       0,
//       236,
//       236
//     );
  
//     const blob = await new Promise((resolve) =>
//       canvas.toBlob(resolve, "image/jpeg")
//     );
  
//     const formData = new FormData();
//     formData.append("image", blob, "cropped.jpg");
  
//     try {
//       const response = await axios.post("http://localhost:5000/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
  
//       console.log("تم رفع الصورة:", response.data);
//     } catch (error) {
//       console.error("فشل رفع الصورة:", error);
//     }
  
//     const croppedImg = URL.createObjectURL(blob);
//     setResult(croppedImg);
//   };
  

//   return (
//     <div style={{ padding: 20 }}>
//       <input type="file" accept="image/*" onChange={handleFile} />

//       {image && (
//         <>
//           <div style={{ width: 300, height: 300, position: "relative", marginTop: 20 }}>
//             <Cropper
//               image={image}
//               crop={crop}
//               zoom={zoom}
//               aspect={1}
//               onCropChange={setCrop}
//               onZoomChange={setZoom}
//               onCropComplete={onCropComplete}
//             />
//           </div>
//           <button onClick={cropImage} style={{ marginTop: 10 }}>
//             قص الصورة
//           </button>
//         </>
//       )}

//       {result && (
//         <div style={{ marginTop: 20 }}>
//           <h4>النتيجة:</h4>
//           <img src={result} alt="cropped" width={236} height={236} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default SimpleCropper;
