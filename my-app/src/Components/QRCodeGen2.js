import React from 'react'
import QRCode from 'qrcode.react';
import { useState,useEffect } from 'react';

function QRCodeGen2() {
   
    const [data, setData] = useState([]);
    const [userIdentifier,setUserIdentifier]=useState('');
    useEffect(() => {
        fetch("https://healthvaultfinal2.onrender.com/getAllUser", {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userData");
            setData(data.data);
          });
      }, []);

      // const qrredirect=()=>{
      //   axios.post("/qrcoderediredt",{email})
      // }

      const generateQRCode = () => {
        // const url = `https://healthvault.netlify.app/?email=${email}`; // Modify the URL as per your requirements
        return <QRCode value={data[0]._id} />;
      };

    return (
        <>
        {console.log(data[0]._id)}
        {generateQRCode()}
        </>
    )
}

export default QRCodeGen2
