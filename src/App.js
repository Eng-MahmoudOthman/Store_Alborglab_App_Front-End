import { RouterProvider , createHashRouter } from 'react-router-dom';
import './App.css';
import { useContext, useEffect } from 'react';
import { UserContext } from './Context/UserContext.js';
import { jwtDecode } from 'jwt-decode';


import Layout from './Components/Layout/Layout.jsx';
import Login from './Components/Login/Login.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import ProtectedRoute from './MiddleWare/ProtectedRoute/ProtectedRoute.jsx';

import ForgetPassword from './Components/ForgetPassword/ForgetPassword.jsx';
import isTokenValid from './Utilities/checkToken.js';
import GuestRoute from './MiddleWare/GuestRoute/GuestRoute.jsx';
import ConfirmedAccount from './Components/ConfirmedAccount/ConfirmedAccount.jsx';
import Home from './Components/Home/Home.jsx';
import Register from './Components/Register/Register.jsx';
import YourTeam from './Components/YourTeam/YourTeam.jsx';
import Setting from './Components/Setting/Setting.jsx';
import DevelopedInformation from './Components/DevelopedInformation/DevelopedInformation.jsx';
import ChangeColor from './Components/ChangeColor/ChangeColor.jsx';
import UserProfile from './Components/UserProfile/UserProfile.jsx';
import UpdateUserProfile from './Components/UpdateUserProfile/UpdateUserProfile.jsx';
import ChangeUserImage from './Components/ChangeUserImage/ChangeUserImage.jsx';
import ChangePassword from './Components/ChangePassword/ChangePassword.jsx';
import SpecificUser from './Components/SpecificUser/SpecificUser.jsx';


// const socket = io(process.env.REACT_APP_BASE_URL) ;



let routers = createHashRouter([
// let routers = createBrowserRouter([
	{path:"/" , element:<Layout /> , children:[
		{index:true , element:<GuestRoute><Login/></GuestRoute>} , 
		{path:"register" , element:<GuestRoute><Register/></GuestRoute>} , 

		{path:"ConfirmedAccount/:id" , element:<ConfirmedAccount/>} , 
		{path:"ForgetPassword" , element:<ForgetPassword/>} , 
		{path:"DevelopedInformation" , element:<DevelopedInformation/>} , 

		{path:"home" , element:<ProtectedRoute><Home/></ProtectedRoute>} , 
		{path:"ChangeColor" , element:<ProtectedRoute><ChangeColor/></ProtectedRoute>} , 
		{path:"YourTeam" , element:<ProtectedRoute><YourTeam/></ProtectedRoute>} , 
		{path:"Setting" , element:<ProtectedRoute><Setting/></ProtectedRoute>} , 
		{path:"UserProfile" , element:<ProtectedRoute><UserProfile/></ProtectedRoute>} , 
		{path:"UpdateUserProfile" , element:<ProtectedRoute><UpdateUserProfile/></ProtectedRoute>} , 
		{path:"ChangeUserImage" , element:<ProtectedRoute><ChangeUserImage/></ProtectedRoute>} , 
		{path:"ChangePassword" , element:<ProtectedRoute><ChangePassword/></ProtectedRoute>} , 
		// {path:"SpecificUser/:id" , element:<ProtectedRoute><SpecificUser/></ProtectedRoute>} , 
		{path:"*" , element:<NotFound />} , 
	]} ,

])








function App() {
	const {
		setRole , 
		setUserToken , 
		setLoggedUser , 
		getUserTeam , 
	} = useContext(UserContext) ;



	useEffect(() => {

		//& Get Token in Local Storage And Save in Use State :
		const token = localStorage.getItem("token") ;
		if(token && isTokenValid(token)){
			setUserToken(token) ;
			try {
					const decoded = jwtDecode(token) ;

					//& Get User Team When Refresh :
					getUserTeam(decoded.branchId) ;

					//& Set Main Color From Database :
					document.documentElement.style.setProperty("--main-color" ,decoded.color ) ;

					//& Set User Role :
					setLoggedUser(decoded);
					setRole(decoded.role);
				} 
			catch (err) {
				console.error("Error decoding token", err);
				localStorage.removeItem("token");
				setUserToken(null);
			}
		} else{
			localStorage.removeItem("token") ;
		}
	}, [setRole , setUserToken , setLoggedUser])



	return (
		<>
			<RouterProvider router={routers} ></RouterProvider>
		</>
	);
}

export default App;
