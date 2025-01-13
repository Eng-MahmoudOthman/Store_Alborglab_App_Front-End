import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
// import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContextProvider from './Context/UserContext.js';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <UserContextProvider>
        <App />
    </UserContextProvider>
);

reportWebVitals();
