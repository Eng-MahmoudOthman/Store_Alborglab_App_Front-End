// import { createHashRouter } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { ToastContainer } from 'react-toastify';
// import { useContext, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { UserContext } from './Context/UserContext.js';

// import Layout from './Components/Layout/Layout.jsx';
// import Home from './Components/Home/Home.jsx';
// import Login from './Components/Login/Login.jsx';
// import Register from './Components/Register/Register.jsx';
// import NotFound from './Components/NotFound/NotFound.jsx';
// import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
// import Contact from './Components/Contact/Contact.jsx';
// import UserProfile from './Components/UserProfile/UserProfile.jsx';
// import ShareWebsite from './Components/ShareWebsite/ShareWebsite.jsx';
import BarcodeScanner from './Components/BarcodeScanner/BarcodeScanner.jsx';
import './App.css';



// let routers = createHashRouter([
// // let routers = createBrowserRouter([
// 	{path:"" , element:<Layout/> , children:[
// 		{index:true , element:<Home/>} , 
// 		{path:"contact" , element:<Contact/>} , 
// 		{path:"login" , element:<Login />} , 
// 		{path:"register" , element:<Register/>} , 
// 		{path:"shareWebsite" , element:<ShareWebsite/>} , 
// 		{path:"userProfile" , element:<ProtectedRoute><UserProfile/></ProtectedRoute>} , 
// 		{path:"*" , element:<NotFound/>} , 
// 	]}
// ])






function App() {

	// const {user} = useContext(UserContext)


	// useEffect(() => {

	// 	//& Get Token in Local Storage And Save in Use State :
	// 	if(localStorage.getItem("token") != null){
	// 		setUserToken(localStorage.getItem("token")) ;

	// 		//& Decoded Token :
	// 		function decodedToken(){
	// 			const token =  localStorage.getItem('token'); 
	// 			let decoded = jwtDecode(token);
	// 			return decoded.role
	// 		}
	
	// 		//& Check Admin Or Or Moderator Or User :
	// 		if( decodedToken() === "admin"){
	// 			setAdmin(true)
	// 		}else if (decodedToken() === "moderator"){
	// 			setModerator(true)
	// 		}
	// 	}
	
	
	// 	if(localStorage.getItem("user") != null){
	// 		setLoggedUser(JSON.parse(localStorage.getItem("user")))
	// 	}
	// }, [])

	// useEffect(() => {
   // }, [])

	return (
		<>
			{/* <TambourineCamera/> */}



			<BarcodeScanner/>
			{/* <RouterProvider router={routers} ></RouterProvider>
			<Toaster/>
			<ToastContainer/> */}
			
		</>
	);
}

export default App;
