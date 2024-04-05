import './App.css';

import React,{useState,useEffect} from 'react'
import MedicalForm from './Components/MedicalFom';
import PatientData from './Components/PatientData';
import Home from './Components/Home';
import QrCodeGenerator from './Components/QrCodeGenerator';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import LoginPage from './Components/Login';
import Register from './Components/Register';
import Articles from './Components/Articles';
import Appointments from './Appointments';
import Navbar from './Components/Navbar';
import QRCodeGen2 from './Components/QRCodeGen2';
import QRLanding from './Components/QRLanding';
function App() {

  return (
  <BrowserRouter>
    <>
    <Navbar/>
    <Routes>

        {/* */}
       
        <Route path="/" element={<Home/>}/>
        <Route path="/appointment" element={<Appointments/>}/>
        <Route path="/articles" element={<Articles/>}/>
        <Route path="/medform" element={<MedicalForm/>}/> 
        <Route path="/patientdata" element={<PatientData/>}/>
        <Route path="/qr" element={<QrCodeGenerator/>}/>
        <Route path="/qrlanding/:param1/:param2" element={<QRLanding/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<Register/>}/>
        {/* <Route path="/mumbai" element={<Home2Upper/>}/>
        <Route path="/delhi" element={<Delhi/>}/>
        <Route path="/kolkata" element={<Kolkata/>}/> */}
      
      </Routes>
    </>

    </BrowserRouter>
  );
}

export default App;