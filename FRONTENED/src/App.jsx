import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'

import {
    Homepage,
    Loginpage,
    Profilepage,
    Settingpage,
    Signuppage
} from "../src/Pages/allpage.js";

function App() {
  return (
    <div>
    
      <Navbar/>

      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/signup" element={<Signuppage/>}/>
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/setting" element={<Settingpage/>}/>
        <Route path="/profile" element={<Profilepage/>}/>
      </Routes>
    </div>
  )
}

export default App;
