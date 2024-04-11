import React, { useState,useEffect } from 'react';
import QRCode from 'qrcode.react';
import './QRCode.css';
import Navbar from './Navbar';

const QrCodeGenerator = () => {
const [user,setUser]=useState({})
  

  useEffect(() => {
    console.log("checking Useeffect")
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  },[]);


  console.log("popvsm",user)
  

  const generateQRCode = () => {
    if(user && user[0])
    {
      const url = `https://master--healthvaultn.netlify.app/qrlanding/${user[0].email}/${user[0]._id}`;
      console.log("Data is",user[0].email);
      return <QRCode value={url} />;
    }
   
  };

  return (
    <>
    <Navbar/>
  <div className='cont'>
  <h1>QR Code</h1>
      <div className='row'>
        
        <div className='col-md-6 qrimage '>
          
           <img src='https://createqrcode.com/assets/img/features-2b.png' alt='img'></img>
        </div>
        <div className='col-md-6 qrcontent' >
       
      
      {generateQRCode()}
      <div>
          <h4 style={{textAlign:"center",color:"white",fontFamily:"Georgia",marginTop:"20px"}}>Scan the QR CODE to view your medical records</h4>
        </div>
        </div>

      
      </div>
      </div>

    </>
  );
};

export default QrCodeGenerator;
