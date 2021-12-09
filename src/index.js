import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


ReactDOM.render(
  <BrowserRouter>
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <HashRouter>
      <App />
    </HashRouter>
    <ToastContainer />
  </BrowserRouter>,
  document.getElementById('root')
);
