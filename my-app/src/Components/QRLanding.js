import React from 'react'
import { useState, useEffect } from 'react'
import { GoDotFill } from "react-icons/go";
import axios from "axios"
import FileDownload from './FileDownload';
import { IoIosArrowDown } from "react-icons/io";
import { useParams } from 'react-router-dom';
import { IoStarSharp } from "react-icons/io5";
import { FaCircleArrowRight } from "react-icons/fa6";
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

  const [allergies, setAllergies] = useState([]);
  const [medicalConditions, setmedicalConditions] = useState([]);
  const [familyHistory, setfamilyHistory] = useState([]);
  const [surgeries, setsurgeries] = useState([]);
  const [immunizations, setimmunizations] = useState([]);
  const [medications, setmedications] = useState([]);
  const [hospitalizations, sethospitalizations] = useState([]);


  
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

        // setAllergies(data[0].allergies.split('\n'))



      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
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
  useEffect(() => {
    if (data && data[0]) {
      if (data[0].allergies)
        setAllergies(data[0].allergies.split('\n'));
      if (data[0].medicalConditions)
        setmedicalConditions(data[0].medicalConditions.split('\n'));
      if (data[0].familyHistory)
        setfamilyHistory(data[0].familyHistory.split('\n'));
      if (data[0].surgeries)
        setsurgeries(data[0].surgeries.split('\n'));
      if (data[0].immunizations)
        setimmunizations(data[0].immunizations.split('\n'));
      if (data[0].medications)
        setmedications(data[0].medications.split('\n'));
      if (data[0].hospitalizations)
        sethospitalizations(data[0].hospitalizations.split('\n'));
    }
  }, [data]);


  // {data && data[0] && setAllergies(data[0].allergies.split('\n'))}

  // {data[0] && data[0].allergies && console.log("Allekkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkrgy",data[0].allergies)}

  // { allergies && console.log("rever",allergies)}
  console.log("Reports", reports);
  const { param1, param2 } = useParams();
  console.log("sdv", data)
  // Logging the parameters to ensure they are correctly obtained
  console.log('param1:', param1);
  console.log('param2:', param2);

  // Filtering the data based on the first parameter (param1)
  const filteredData = data.filter((dat) => dat.email == param1);

  // Logging the filtered data to verify the result
  console.log('Filtered data:', filteredData);

  return (
    <>
      <div>
        <div className='parentContainer'>
          <h1 style={{ marginTop: "40px", marginBottom: "20px" }} className="Logo">
            My Health Record
          </h1>
          <div className="accordian_wrapper">

            <div onClick={() => setPersonal(!personal)} className='upper personal'>
              <h3>Personal Information</h3>
              <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>

            </div>
            {

              personal && <div className='lower'>
                <p><FaCircleArrowRight /> <span>Name :</span> {data.fullName}</p>
                <p><FaCircleArrowRight /> <span>DOB :</span> {data && data[0] ? data[0].dateOfBirth : ''}</p>
                <p><FaCircleArrowRight /> <span>Gender :</span> {data && data[0] ? data[0].gender : ''}</p>
                <p><FaCircleArrowRight /> <span>Address :</span> {data && data[0] ? data[0].address : ''}</p>
                <p><FaCircleArrowRight /> <span>Contact :</span> {data && data[0] ? data[0].phoneNumber : ''}</p>
                <p><FaCircleArrowRight /> <span>Email :</span> {data && data[0] ? data[0].email : ''}</p>

              </div>
            }
          </div>
          {/* {  data && data[0]?setAllergies(data[0].allergies.split('\n')):''} */}
          
          <div className="accordian_wrapper">

            <div onClick={() => setVital(!vital)} className='upper vital'>
              <h3>Vital Signs</h3>
              <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
            </div>
            {
              vital && <div className='lower'>
                <p><FaCircleArrowRight /> <span>Blood Pressure:</span> {data && data[0] ? data[0].bloodPressure : ''}</p>
                <p><FaCircleArrowRight /> <span>Heart Rate:</span> {data && data[0] ? data[0].heartRate : ''}</p>
                <p><FaCircleArrowRight /> <span>Respiratory Rate:</span> {data && data[0] ? data[0].respiratoryRate : ''}</p>
                <p><FaCircleArrowRight /> <span>Body Temperature:</span> {data && data[0] ? data[0].bodyTemperature : ''}</p>
              </div>
            } </div>
          <div className="accordian_wrapper">

            <div onClick={() => setDoctors(!doctors)} className='upper doctors'>
              <h3>Doctor's Notes</h3>
              <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
            </div>
            {
              doctors && <div className='lower'>
                <p><FaCircleArrowRight /> <span>Progress Notes:</span> {data && data[0] ? data[0].progressNotes : ''}</p>
                {/* <p><FaCircleArrowRight /> Consultation Reports: {data[0].consultationReports}</p> */}
              </div>
            }   </div>
          <div className="accordian_wrapper">

            <div onClick={() => setInsurance(!insurance)} className='upper insurance'>
              <h3>Insurance Information</h3>
              <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
            </div>
            {
              insurance && <div className='lower'>
                <p><FaCircleArrowRight /> <span>Insurance Provider:</span> {data && data[0] ? data[0].insuranceProvider : ''}</p>
                <p><FaCircleArrowRight /> <span>Policy Number:</span> {data && data[0] ? data[0].policyNumber : ''}</p>
                <p><FaCircleArrowRight /> <span>Copayment Info:</span> {data && data[0] ? data[0].copaymentInfo : ''}</p>

              </div>
            } </div>
          <div className="accordian_wrapper">

            <div onClick={() => setEmergencyContacts(!emergencyContacts)} className='upper emergencyContacts'>
              <h3>Emergency Contacts</h3>
              <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
            </div>
            {
              emergencyContacts && <div className='lower'>
                <p><FaCircleArrowRight /> <span></span>Emergency Contacts: {data && data[0] ? data[0].emergencyContacts : ''}</p>
              </div>
            } </div>
          <div className="accordian_wrapper">

            <div onClick={() => setOthers(!others)} className='upper others'>
              <h3>Other Relevant Information</h3>
              <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
            </div>
            {
              others && <div className='lower'>
                <p><FaCircleArrowRight /> <span>Lifestyle Habits:</span> {data && data[0] ? data[0].lifestyleHabits : ''}</p>
                <p><FaCircleArrowRight /> <span>Occupational History:</span> {data && data[0] ? data[0].occupationalHistory : ''}</p>
                <p><FaCircleArrowRight /> <span>Dietary Preferences:</span> {data && data[0] ? data[0].dietaryPreferences : ''}</p>
                <p><FaCircleArrowRight /> <span>Blood Group:</span> {data && data[0] ? data[0].bloodGroup : ''}</p>
              </div>
            } </div>
            <div className="accordian_wrapper">

<div onClick={() => setMedical(!medical)} className='upper medical'>
  <h3>Medical History</h3>
  <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
</div>


{
  medical && <div className='lower3 lower'>

    <p ><FaCircleArrowRight />  Allergies: </p>
    <ol className='lists' start="1">

      {allergies.map((allergy, index) => (
        <li style={{ fontSize: "12px" }} key={index}><GoDotFill />{allergy}</li>
      ))}
    </ol>
    <p><FaCircleArrowRight />  Medical Condition: </p>
    <ol className='lists' start="1">

      {medicalConditions.map((medicalCondition, index) => (
        <li style={{ fontSize: "12px" }} key={index}><GoDotFill />{medicalCondition}</li>
      ))}
    </ol>
    <p><FaCircleArrowRight />  Family History: </p>
    <ol className='lists' start="1">

      {familyHistory.map((family, index) => (
        <li style={{ fontSize: "12px" }} key={index}><GoDotFill />{family}</li>
      ))}
    </ol>
    <p><FaCircleArrowRight />  Surgeries:</p>
    <ol className='lists' start="1">

      {surgeries.map((surgery, index) => (
        <li style={{ fontSize: "12px" }} key={index}><GoDotFill />{surgery}</li>
      ))}
    </ol>
    <p><FaCircleArrowRight />  Immunizations:</p>
    <ol className='lists' start="1">

      {immunizations.map((Immunization, index) => (
        <li style={{ fontSize: "12px" }} key={index}><GoDotFill />{Immunization}</li>
      ))}
    </ol>
    <p><FaCircleArrowRight /> Medications: </p>
    <ol className='lists' start="1">

      {medications.map((medication, index) => (
        <li style={{ fontSize: "12px" }} key={index}><GoDotFill />{medication}</li>
      ))}
    </ol>
    <p><FaCircleArrowRight />  Hospitalizations:</p>
    <ol className='lists' start="1">

      {hospitalizations.map((hospitalization, index) => (
        <li style={{ fontSize: "12px" }} key={index}><GoDotFill />{hospitalization}</li>
      ))}
    </ol>

  </div>
} </div>
          <div style={{ marginBottom: "40px" }} className="accordian_wrapper">

            <div onClick={() => setDiagnostic(!diagnostic)} className='upper diagnostic'>
              <h3>Diagnostic Test Results</h3>
              <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
            </div>
            {
              diagnostic && <div className='lower'>
                {
                  reports.map((report) => {
                    return (
                      report && report.email && (
                        param1 === report.email ? (
                          <FileDownload filename={report.name} fileUrl={report.fileUrl} />
                        ) : null)
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
