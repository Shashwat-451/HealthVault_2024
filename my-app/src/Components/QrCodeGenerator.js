import React, { useState,useEffect } from 'react';
import QRCode from 'qrcode.react';
import {Link} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import './QRCode.css';
import { setLoggedIn } from '../Redux/Slices/AuthSlice';
const QrCodeGenerator = () => {
  const [email, setEmail] = useState('');
  const [data, setData] = useState({});
 
  const [user,setUser]=useState({})
  // const user=useSelector(state=>state.user);
  // console.log("ewoiho",user);
  
  // useEffect(() => {
  //   setData(user);
  // }, [user]);

  
  // useEffect(() => {
  //   const userFromStorage = localStorage.getItem("user");
  //   if (userFromStorage) {
  //     setData(JSON.parse(userFromStorage));
  //   }
  // }, []);
  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);


  console.log("popvsm",user)
  
  // console.log("kvknr",data);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  console.log(data);
  const generateQRCode = () => {
    const url = `https://master--healthvaultn.netlify.app/qrlanding/${user[0].email}/${user[0]._id}`;
    console.log("Data is",user[0].email);
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
