import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { BrowserMultiFormatReader } from '@zxing/library';
import * as Yup from 'yup';
import "./BarcodeScanner.css"



export default function BarcodeScanner() {
	const [display, setDisplay] = useState(false); // Controls tambourine display and camera activation
	const [result, setResult] = useState(null);
	const videoRef = useRef(null);
	const codeReader = useRef(new BrowserMultiFormatReader());

	useEffect(() => {
		const startScanning = () => {
			codeReader.current.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
			if (result) {
				setResult(result.getText());
				playAudio(); // Play beep sound on successful scan
			}
			if (err && err.name !== "NotFoundException") {
				console.error(err);
			}
			});
		};

		if (display) {
			startScanning();
		} else {
			stopScanning();
		}

		return () => stopScanning();
	}, [display]);

	const stopScanning = () => {
		codeReader.current.reset();
		const stream = videoRef.current?.srcObject;
		const tracks = stream?.getTracks();

		if (tracks) {
			tracks.forEach((track) => track.stop());
		}
		if (videoRef.current) {
			videoRef.current.srcObject = null;
		}
	};

	const playAudio = () => {
		const audio = new Audio(process.env.PUBLIC_URL + "/audio/beep.mp3"); // For public folder
		audio.play();
	};


	const addNewItem = (values)=>{
		console.log(values);
	}


	let validationSchema = Yup.object({
      code:Yup.string().max(10).min(10) ,
   })


   let formik = useFormik({
      initialValues:{
         code:"" ,
      } , validationSchema , 
      onSubmit:addNewItem
   })

	return (
		<>
			<div className="container my-5">
				<div>
					<h2 className="text-danger text-center">Barcode Scanning</h2>
					<div className="text-center my-3">
						<button onClick={() => setDisplay(!display)} className={`btn btn-sm ${display?"btn-danger" : "btn-success"} w-50` }>
							{display ? "Stop Scanner Camera" : "Start Scanner Camera"}
						</button>
					</div>

					{/* Camera Video Stream */}
					{display && (
						<div className="video-container">
							<video ref={videoRef}/>
						</div>
					)}

					{/* Scanning result */}
					<div>
						<h3>Result: {result}</h3>
					</div>
				</div>
		

				<div className="w-75 p-2 m-auto mt-5">
					<p className="text-secondary">Enter your Item Information </p>

					<form action="" onSubmit={formik.handleSubmit}>

						{/* {error?<div className="alert alert-danger w-75  my-4">{error}</div> :""} */}

						<div className="my-4">
							<label htmlFor="code" className="form-label">Enter Item Code</label>
							<input type="text" 
								value={formik.values.code || result}
								onChange={formik.handleChange} 
								onBlur={formik.handleBlur}
								className="form-control" id="code"  
								name="code" 
								placeholder="name@example.com" />
							{formik.errors.code  && formik.touched.code?<div className="alert alert-danger mt-4 p-2">{formik.errors.code}</div> :""}
						</div>

					</form>

				</div>
			</div>
		</>
	);
}


























// export default function BarcodeScanner() {
// 	const [display, setDisplay] = useState(false);
// 	const [scanning, setScanning] = useState(false);
// 	const [result, setResult] = useState(null);
// 	const videoRef = useRef(null);
// 	const codeReader = useRef(new BrowserMultiFormatReader());




// 	useEffect(() => {
// 		const startScanning = () => {
// 			codeReader.current.decodeFromVideoDevice(
// 			null,
// 			videoRef.current,
// 			(result, err) => {
// 				if (result) {
// 					setResult(result.getText());
// 					playAudio(); // Play beep sound on successful scan
// 				}
// 				if (err && !(err.name === 'NotFoundException')) {
// 					console.error(err);
// 				}
// 			}
// 			);
// 		};

// 		if (scanning) {
// 			startScanning();
// 		} else {
// 			stopScanning();
// 		}

// 		return () => stopScanning();
// 	}, [scanning]);


// 	// useEffect(() => {
// 	// 	handleClick()
// 	// }, [])
	

// 	const addItem = (values)=>{
// 		console.log(values);
		
// 	}



// 	const stopScanning = () => {
// 		codeReader.current.reset();
// 		const stream = videoRef.current?.srcObject;
// 		const tracks = stream?.getTracks();

// 		if (tracks) {
// 			tracks.forEach((track) => track.stop());
// 		}
// 		if (videoRef.current) {
// 			videoRef.current.srcObject = null;
// 		}
// 	};



// 	const handleClick = () => {
// 		setResult(null);
// 		setScanning(true);
// 	};


// 	//! Create File Audio And Audio Play :
// 	const playAudio = () => {
// 		const audio = new Audio(process.env.PUBLIC_URL + '/audio/beep.mp3'); // For public folder
// 		audio.play();
// 	};






// 	let validationSchema = Yup.object({
//       code:Yup.string().max(10).min(10) ,
//    })


//    let formik = useFormik({
//       initialValues:{
//          code:"" ,
//       } , validationSchema , 
//       onSubmit:addItem
//    })


// 	// const displayScan = ()=>{
// 	// 	if(display){
// 	// 		console.log("Start" , display);
// 	// 		handleClick()
// 	// 	}else{
// 	// 		stopScanning() 
// 	// 		console.log("Stop" , display);
// 	// 	}
// 	// }


// 	return (
// 		<>
// 			<div className='container my-5'>
// 				<h2 className='text-danger text-center'>Barcode Scanning</h2>
// 				<div className='text-center my-3'>
// 					<button onClick={()=>setDisplay(!display)}  className='btn btn-sm btn-success w-50'>Scanning Barcode</button>
// 				</div>
// 				<div className='video-container' style={display?{display:"block"}:{display:"none"}}>
// 					<video ref={videoRef}/>
// 				</div>

// 				<div>
// 					<h3>Result: {result}</h3>
// 				</div>
// 			</div>
// 		</>
// 	);
// }



























// import { BrowserMultiFormatReader } from '@zxing/library';
// import React, { useState } from 'react';
// import { useEffect } from 'react';
// import { useRef } from 'react';





// export default function BarcodeScanner() {
//    const [scanning, setScanning] = useState(false);
//    const [result, setResult] = useState(null);
//    const videoRef = useRef(null);
//    const codeReader = useRef(new BrowserMultiFormatReader()) ;




//    useEffect(() => {
//       if(scanning){
//          startScanning() ;
//       }else{
//          stopScanning() ;
//       }
//       return ()=> stopScanning();
//    }, [scanning])

//    const startScanning = ()=>{
//       codeReader.current.decodeFromVideoDevice(
//          null ,
//          videoRef.current ,
//          (result , err)=>{
//             if(result){
//                setResult(result.getText()) ;
//                setScanning(false)
//             }
//             if(err && !(err.name === "NotFoundException")){
//                console.error(err);
//             }
//          }
//       )
//    }


//    const stopScanning = ()=>{
//       codeReader.current.reset();
//       const stream = videoRef.current?.srcObject;
//       const tracks = stream?.getTracks() ;

//       if(tracks){
//          tracks.forEach((track)=> track.stop()) ;
//       }
//       if(videoRef.current){
//          videoRef.current.srcObject = null
//       }
//    }


//    const handleClick = ()=>{
//       setResult(null) ;
//       setScanning(true) ;
//    };



//    return (
//       <>
//          <div>
//             <button onClick={handleClick}>Start Scanning</button>
//             {scanning && (
//                <div>
//                   <video 
//                      ref={videoRef}
//                      width="300"
//                      height="200"
//                      style={{border:"1px solid black"}}
//                      />
//                </div>
//             )}
//             {result && (
//                <div>
//                   <h3>Scanned Result :</h3>
//                   <p>{result}</p>
//                </div>
//             )}
//          </div>
//       </>
//    )
// }