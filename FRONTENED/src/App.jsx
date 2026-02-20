import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import {Loader} from 'lucide-react';
import {Toaster} from 'react-hot-toast';

import {
    Homepage,
    Loginpage,
    Profilepage,
    Settingpage,
    Signuppage
} from "../src/Pages/allpage.js";

function App() {

  const {authUser,checkauth,isCheckingAuth} = useAuthStore();

  useEffect(()=>{
    checkauth();
  },[checkauth]);

  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"/>
    </div>
  )
  return (
    <div>
    
      <Navbar/>

      <Routes>
        <Route path="/" element={checkauth ? <Homepage/> : <Navigate to='/login'/> }/>
        <Route path="/signup" element={!authUser ?<Signuppage/> : <Navigate to='/'/>}/>
        <Route path="/login" element={!authUser ?<Loginpage/>: <Navigate to='/'/>}/>
        <Route path="/setting" element={<Settingpage/>}/>
        <Route path="/profile" element={checkauth ?<Profilepage/> : <Navigate to='/login'/>}/>
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App;
