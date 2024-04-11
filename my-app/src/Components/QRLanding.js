import React from 'react'
import {useState,useEffect} from 'react'
import axios from "axios"
import FileDownload from './FileDownload';
import { IoIosArrowDown } from "react-icons/io";
import { useParams } from 'react-router-dom';
function QRLanding() {
    const [data, setData] = useState([]);

    const [personal, setPersonal] = useState(false);
    const [medical, setMedical] = useState(false);
    const [vital, setVital] = useState(false);
    const [doctors, setDoctors] = useState(false);
    const [insurance, setInsurance] = useState(false);
    const [emergencyContacts, setEmergencyContacts] = useState(false);
    const [others, setOthers] = useState(false);
    const [diagnostic, setDiagnostic] = useState(false);
    
    const [reports, setReports] = useState([]);
    const [user, setUser] = useState({})


//fetch("https://healthvaultfinal2.onrender.com/getAllUser",
useEffect(() => {
    fetch("https://healthvault-2024.onrender.com/getAllUser", {
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
 <div>
            <div className='parentContainer'>
            <h1 style={{marginTop:"40px",marginBottom:"20px"}} className="Logo">
         My Health Record
        </h1>
                <div className="accordian_wrapper">

                    <div onClick={() => setPersonal(!personal)} className='upper personal'>
                        <h3>Personal Information</h3>
                        <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>

                    </div>
                    {

                        personal && <div className='lower'> <p>Name : {data.fullName}</p>
                            <p>DOB : {data && data[0]?data[0].dateOfBirth:''}</p>
                            <p>Gender : {data && data[0]?data[0].gender:''}</p>
                            <p>Address : {data && data[0]?data[0].address:''}</p>
                            <p>Contact : {data && data[0]?data[0].phoneNumber:''}</p>
                            <p>Email : {data && data[0]?data[0].email:''}</p>

                        </div>
                    }
                </div>

                <div className="accordian_wrapper">

                    <div onClick={() => setMedical(!medical)} className='upper medical'>
                        <h3>Medical History</h3>
                        <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
                    </div>
                    {
                        medical && <div className='lower'>
                            <p>Allergies: {data && data[0]?data[0].allergies:''}</p>
                            <p>Medical Condition: {data && data[0]?data[0].medicalConditions:''}</p>
                            <p>Family History: {data && data[0]?data[0].familyHistory:''}</p>
                            <p>Surgeries: {data && data[0]?data[0].surgeries:''}</p>
                            <p>Immunizations: {data && data[0]?data[0].immunizations:''}</p>
                            <p>Medications: {data && data[0]?data[0].medications:''}</p>
                            <p>Hospitalizations: {data && data[0]?data[0].hospitalizations:''}</p>

                        </div>
                    } </div>
                <div className="accordian_wrapper">

                    <div onClick={() => setVital(!vital)} className='upper vital'>
                        <h3>Vital Signs</h3>
                        <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
                    </div>
                    {
                        vital && <div className='lower'>
                            <p>Blood Pressure: {data && data[0]?data[0].bloodPressure:''}</p>
                            <p>Heart Rate: {data && data[0]?data[0].heartRate:''}</p>
                            <p>Respiratory Rate: {data && data[0]?data[0].respiratoryRate:''}</p>
                            <p>Body Temperature: {data && data[0]?data[0].bodyTemperature:''}</p>
                        </div>
                    } </div>
                <div className="accordian_wrapper">

                    <div onClick={() => setDoctors(!doctors)} className='upper doctors'>
                        <h3>Doctor's Notes</h3>
                        <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
                    </div>
                    {
                        doctors && <div className='lower'>
                            <p>Progress Notes: {data && data[0]?data[0].progressNotes:''}</p>
                            {/* <p>Consultation Reports: {data[0].consultationReports}</p> */}
                        </div>
                    }   </div>
                <div className="accordian_wrapper">

                    <div onClick={() => setInsurance(!insurance)} className='upper insurance'>
                        <h3>Insurance Information</h3>
                        <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
                    </div>
                    {
                        insurance && <div className='lower'>
                            <p>Insurance Provider: {data && data[0]?data[0].insuranceProvider:''}</p>
                            <p>Policy Number: {data && data[0]?data[0].policyNumber:''}</p>
                            <p>Copayment Info: {data && data[0]?data[0].copaymentInfo:''}</p>

                        </div>
                    } </div>
                <div className="accordian_wrapper">

                    <div onClick={() => setEmergencyContacts(!emergencyContacts)} className='upper emergencyContacts'>
                        <h3>Emergency Contacts</h3>
                        <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
                    </div>
                    {
                        emergencyContacts && <div className='lower'>
                            <p>Emergency Contacts: {data && data[0]?data[0].emergencyContacts:''}</p>
                        </div>
                    } </div>
                <div className="accordian_wrapper">

                    <div onClick={() => setOthers(!others)} className='upper others'>
                        <h3>Other Relevant Information</h3>
                        <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
                    </div>
                    {
                        others && <div className='lower'>
                            <p>Lifestyle Habits: {data && data[0]?data[0].lifestyleHabits:''}</p>
                            <p>Occupational History: {data && data[0]?data[0].occupationalHistory:''}</p>
                            <p>Dietary Preferences: {data && data[0]?data[0].dietaryPreferences:''}</p>
                            <p>Blood Group: {data && data[0]?data[0].bloodGroup:''}</p>
                        </div>
                    } </div>
                <div style={{marginBottom:"40px"}} className="accordian_wrapper">

                    <div onClick={() => setDiagnostic(!diagnostic)} className='upper diagnostic'>
                        <h3>Diagnostic Test Results</h3>
                        <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
                    </div>
                    {
                        diagnostic && <div className='lower'>
                            {
                                reports.map((report) => {
                                    return (

                                        user[0].email === report.email ? (
                                            <FileDownload filename={report.name} fileUrl={report.fileUrl} />
                                        ) : null
                                    )
                                })
                            }
                        </div>
                    } </div>

            </div>
        </div>
    </>
  );
}

export default QRLanding
