import { BrowserMultiFormatReader } from '@zxing/library';
import React, { useState, useEffect, useRef } from 'react';

export default function BarcodeScanner() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);
  const beepSound = useRef(null); // Reference to the beep sound
  const codeReader = useRef(new BrowserMultiFormatReader());




  useEffect(() => {
    const startScanning = () => {
      codeReader.current.decodeFromVideoDevice(
        null,
        videoRef.current,
        (result, err) => {
          if (result) {
            setResult(result.getText());
            playBeepSound(); // Play beep sound on successful scan
          }
          if (err && !(err.name === 'NotFoundException')) {
            console.error(err);
          }
        }
      );
    };

    if (scanning) {
      startScanning();
    } else {
      stopScanning();
    }

    return () => stopScanning();
  }, [scanning]);

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

  const handleClick = () => {
    setResult(null);
    setScanning(true);
  };

  const playBeepSound = () => {
    if (beepSound.current) {
      // Play the audio only when it's loaded and ready
      beepSound.current.play().catch((err) => {
        console.error('Autoplay error:', err);
      });
    }
  };





      // const playAudio = () => {
      //   const audio = new Audio(process.env.PUBLIC_URL + '/beep.mp3'); // For public folder
      //   audio.play();
      // };

  return (
    <>
      {/* <button onClick={playAudio}>Audio</button> */}
      <div>
        <button onClick={handleClick}>Start Scanning</button>
        <audio ref={beepSound} src={process.env.PUBLIC_URL + '/beep.mp3'} preload="auto" controls/>

        <div>
          <video
            ref={videoRef}
            style={{ width: '100%', height: '380px' }}
          />
        </div>

        <div>
          <h3>Result: {result}</h3>
        </div>
      </div>
    </>
  );
}



























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