import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PatientData.css'
const MedicalFormData = () => {
  const [data, setData] = useState([]);

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


  return (
    <>

      <div className="medical-form-data">
      <h2 style={{fontFamily:"georgia",color:"white",marginTop:"40px",fontSize:"30px",fontWeight:"bold"}}> Medical Record</h2>
        <div className='wrapper2'>
      
       
        <table>
  <thead>
    
  </thead>
  <tbody>
    {data.map((user) => (<>
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
      </>))}
  </tbody>
</table>

      </div>
      </div>
    </>
  );
};

export default MedicalFormData;
