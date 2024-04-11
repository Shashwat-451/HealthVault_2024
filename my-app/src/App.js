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
import MedicalRecordForm from './Components/MedicalRecordForm';
import PatientData2 from './Components/PatientData2';
function App() {

  return (
  <BrowserRouter>
    <>
    
    <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/medform" element={<MedicalRecordForm/>}/> 
        <Route path="/patientdata" element={<PatientData2/>}/>
        <Route path="/qr" element={<QrCodeGenerator/>}/>
        <Route path="/qrlanding/:param1/:param2" element={<QRLanding/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/appointments" element={<Appointments/>}/>
       
      
      </Routes>
    </>

    </BrowserRouter>
  );
}

export default App;