import React, { useState,useEffect } from 'react';
import './MedicalForm.css'
import axios from 'axios';
import {Link} from 'react-router-dom';



const MedicalForm = () => {

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [user,setUser]=useState({})
  

  useEffect(() => {
   
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  },[]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    medicalHistory: '',
    allergies: '',
    previousTreatments: '',
    medications: ''
  });

  // const LoginLogoutButtons = () => {
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  //   const handleLogin = () => {
  //     // Perform login logic
  //     setIsLoggedIn(true);
  //   };
  
  //   const handleLogout = () => {
  //     // Perform logout logic
  //     setIsLoggedIn(false);
  //   };

  // }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://healthvault-2024.onrender.com/patientData', formData);
      console.log(response.data);
      alert('Patient information saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to save patient information. Please try again later.');
    }
  };

  const handleUpload = async () => {
 
    try {
      const formData = new FormData();
     if(user && user[0])
     {
      formData.append('email',user[0].email)
     } 
      formData.append('file', file);

      const response = await axios.post('https://healthvault-2024.onrender.com/fileUpload', formData);
      console.log(response.data);
      alert('File Uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to upload File');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>


     
      
    
   

      {/* <div className="container">
        <div className="items" id="item1"></div>
        <div className="items" id="item2"></div>
        <div className="items" id="item3"></div>
        <div className="items" id="item4"></div>
        <div className="items" id="item5"></div>
        <div className="items" id="item6"></div>
        <div className="items" id="item7"></div>
        <div className="items" id="item8"></div>
      </div> */}
      <div className="parent">
      

      <form onSubmit={handleSubmit}>
    
    <div className='wrapper'>

    <h1 style={{textAlign:"center",color:"white",fontFamily:"georgia",fontWeight:"bold",paddingTop:"5%"}}>Medical Form</h1>
      <input
     
        type="text"
        placeholder='First Name'
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
  


     
      <input
     
        type="text"
        placeholder='Last Name'
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />

     
      <input
     
        type="date"
        placeholder='DOB'
        id="dateOfBirth"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        required
      />


      <select
     
      placeholder='Gender'
        id="gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="non-binary">Non-binary</option>
      </select>


      <input
     
        type="email"
        placeholder='Email'
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />


      <input
     
        type="tel"
        placeholder='Contact Number'
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      
      <input
     
      placeholder='Address'
        id="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      ></input>

      <textarea
      className='textt'
      placeholder='Medical History'
        id="medicalHistory"
        name="medicalHistory"
        value={formData.medicalHistory}
        onChange={handleChange}
        required
      ></textarea>

      <textarea
      className='textt'
      placeholder='Allergies'
        id="allergies"
        name="allergies"
        value={formData.allergies}
        onChange={handleChange}
        required
      ></textarea>
  
      <textarea
      className='textt'
      placeholder='Previous Treatments'
        id="previousTreatments"
        name="previousTreatments"
        value={formData.previousTreatments}
        onChange={handleChange}
        required
        ></textarea>

<textarea
className='textt'
placeholder='Medications'
        id="medications"
        name="medications"
        value={formData.medications}
        onChange={handleChange}
        required
        ></textarea>


  <div>
      <input
      style={{backgroundColor:"white"}}
      placeholder='Report'
      type='file'
        id="report"
        name="file"
        value={formData.report}
        onChange={handleFileChange}
        required
        
      ></input>
      <button onClick={()=>handleUpload()}>Upload</button>
      </div>
  <button className="btnclass" style={{color:"black",marginBottom:"3%"}} type="submit">Submit</button>
  </div>
</form>

</div>
       {/* <button style={{marginLeft:"150px"}}onClick={handleSubmit}>Submit</button> */}



</>
  );};
        export default MedicalForm;