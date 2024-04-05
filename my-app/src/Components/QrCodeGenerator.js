import React, { useState,useEffect } from 'react';
import QRCode from 'qrcode.react';
import {Link} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import './QRCode.css';
import { setLoggedIn } from '../Redux/Slices/AuthSlice';
const QrCodeGenerator = () => {
  const [email, setEmail] = useState('');
  const [data, setData] = useState('');
 
    
  const user=useSelector(state=>state.user);
  console.log("ewoiho",user);
  // useEffect hook to update data when user changes
  useEffect(() => {
    // Update data when user changes
    setData(user);
  }, [user]); // Only run this effect when user changes

  // console.log("popvsm",data._id)
  
  // console.log("kvknr",data);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  console.log(data);
  const generateQRCode = () => {
    const url = `https://healthvault.netlify.app/${data.email}/${data._id}`;
    return <QRCode value={url} />;
  };

  return (
    <>
  <div className='cont'>
      <div className='row'>
        <div className='col-md-6 qrimage '>
           <img src='https://createqrcode.com/assets/img/features-2b.png' alt='img'></img>
        </div>
        <div className='col-md-6 qrcontent' >
        <h1>QR Code</h1>
      
      {generateQRCode()}
        </div>
      </div>
      </div>

    </>
  );
};

export default QrCodeGenerator;
