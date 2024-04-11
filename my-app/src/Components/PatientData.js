import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FileDownload from './FileDownload';
import './PatientData.css'
const MedicalFormData = () => {
  const [data, setData] = useState([]);
  const [reports, setReports] = useState([]);
  const [user2,setUser]=useState({})
  

  useEffect(() => {
    console.log("checking Useeffect")
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  },[]);

  useEffect(() => {
    fetch("https://healthvault-2024.onrender.com/getAllUser", {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  }, []);

  useEffect(() => {
    fetch("https://healthvault-2024.onrender.com/getAllReports", {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "reports");
        setReports(data.data);
      });
  }, []);



  return (
    <>

      <div className="medical-form-data">
      <h2 style={{fontFamily:"georgia",color:"white",marginTop:"40px",fontSize:"30px",fontWeight:"bold"}}> Medical Record</h2>
        <div className='wrapper2'>
      
       
        <table>
  <thead>
    
  </thead>
  <tbody>
    {data.map((user) => (user2[0].email === user.email && <>
      <tr className="user" key={user._id}>
        <td className='boldd' >Name:</td>
        <td>{user.firstName} {user.lastName}</td>
      </tr>
      <tr>
        <td className='boldd'>Date of Birth:</td>
        <td>{user.dateOfBirth}</td>
      </tr>
      <tr>
        <td className='boldd'>Gender:</td>
        <td>{user.gender}</td>
      </tr>
      <tr>
        <td className='boldd'>Email:</td>
        <td>{user.email}</td>
      </tr>
      <tr>
        <td className='boldd'>Phone:</td>
        <td>{user.phone}</td>
      </tr>
      <tr>
        <td className='boldd'>Address:</td>
        <td>{user.address}</td>
      </tr>
      <tr>
        <td className='boldd'>Medical History:</td>
        <td>{user.medicalHistory}</td>
      </tr>
      <tr>
        <td className='boldd'>Allergies:</td>
        <td>{user.allergies}</td>
      </tr>
      <tr>
        <td className='boldd'>Previous Treatments:</td>
        <td>{user.previousTreatments}</td>
      </tr>
      <tr>
        <td className='boldd'>Medications:</td>
        <td>{user.medications}</td>
      </tr>
    <tr>
   
      {
        reports.map((report)=>{
          return(
            
            user2[0].email === report.email ? (
              <FileDownload filename={report.name} fileUrl={report.fileUrl} />
            ) : null
          )
        })
      }
    </tr>
      </>))}
  </tbody>
</table>

      </div>
      </div>
    </>
  );
};

export default MedicalFormData;
