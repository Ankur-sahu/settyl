import './assets/css/App.css';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './layouts/Navbar';
import Login from './components/login/Login';
import Registration from './components/registration/Registration' 
import Dashboard from './components/dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import Context from './contexts/Context';


function App() {
  return (

    <BrowserRouter>
      <Context>
        <Navbar />
        <ToastContainer
          position="top-center"
          autoClose={3000} />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Registration/>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/*' element={<main><div className='display-row container'>Page Not Found</div></main>} />
        </Routes>
      </Context>
    </BrowserRouter>
  );
}

export default App;
