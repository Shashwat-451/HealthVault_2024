import React from 'react'
import {useState,useEffect} from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom';
function QRLanding() {
    const [data, setData] = useState([]);

//fetch("https://healthvaultfinal2.onrender.com/getAllUser",
useEffect(() => {
    fetch("https://healthvaultfinal2.onrender.com/getAllUser", {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);
  

  const { param1, param2 } = useParams();
console.log("sdv",data)
  // Logging the parameters to ensure they are correctly obtained
  console.log('param1:', param1);
  console.log('param2:', param2);

  // Filtering the data based on the first parameter (param1)
  const filteredData = data.filter((dat) =>dat.email==param1);

  // Logging the filtered data to verify the result
  console.log('Filtered data:', filteredData);

  return (
    <>

      <div className="medical-form-data">
      <h2 style={{fontFamily:"georgia",color:"white",marginTop:"40px",fontSize:"30px",fontWeight:"bold"}}> Medical Record</h2>
        <div className='wrapper2'>
      
       
        <table>
  <thead>
    
  </thead>
  <tbody>
    {filteredData.map((user) => (<>
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
}

export default QRLanding
