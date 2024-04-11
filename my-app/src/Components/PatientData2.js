import React from 'react'
import { useState, useEffect } from 'react'
import './PatientData2.css'
import { IoIosArrowDown } from "react-icons/io";
import FileDownload from './FileDownload';
function PatientData2() {

    const [personal, setPersonal] = useState(false);
    const [medical, setMedical] = useState(false);
    const [vital, setVital] = useState(false);
    const [doctors, setDoctors] = useState(false);
    const [insurance, setInsurance] = useState(false);
    const [emergencyContacts, setEmergencyContacts] = useState(false);
    const [others, setOthers] = useState(false);
    const [diagnostic, setDiagnostic] = useState(false);
    const [data, setData] = useState([]);
    const [reports, setReports] = useState([]);
    const [user, setUser] = useState({})

    useEffect(() => {
        console.log("checking Useeffect")
        const userFromStorage = localStorage.getItem("user");
        if (userFromStorage) {
            setUser(JSON.parse(userFromStorage));
        }
    }, []);
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
                            <p>DOB : {data[0].dateOfBirth}</p>
                            <p>Gender : {data[0].gender}</p>
                            <p>Address : {data[0].address}</p>
                            <p>Contact : {data[0].phoneNumber}</p>
                            <p>Email : {data[0].email}</p>

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
                            <p>Allergies: {data[0].allergies}</p>
                            <p>Medical Condition: {data[0].medicalConditions}</p>
                            <p>Family History: {data[0].familyHistory}</p>
                            <p>Surgeries: {data[0].surgeries}</p>
                            <p>Immunizations: {data[0].immunizations}</p>
                            <p>Medications: {data[0].medications}</p>
                            <p>Hospitalizations: {data[0].hospitalizations}</p>

                        </div>
                    } </div>
                <div className="accordian_wrapper">

                    <div onClick={() => setVital(!vital)} className='upper vital'>
                        <h3>Vital Signs</h3>
                        <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
                    </div>
                    {
                        vital && <div className='lower'>
                            <p>Blood Pressure: {data[0].bloodPressure}</p>
                            <p>Heart Rate: {data[0].heartRate}</p>
                            <p>Respiratory Rate: {data[0].respiratoryRate}</p>
                            <p>Body Temperature: {data[0].bodyTemperature}</p>
                        </div>
                    } </div>
                <div className="accordian_wrapper">

                    <div onClick={() => setDoctors(!doctors)} className='upper doctors'>
                        <h3>Doctor's Notes and Consultation Reports</h3>
                        <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
                    </div>
                    {
                        doctors && <div className='lower'>
                            <p>Progress Notes: {data[0].progressNotes}</p>
                            <p>Consultation Reports: {data[0].consultationReports}</p>
                        </div>
                    }   </div>
                <div className="accordian_wrapper">

                    <div onClick={() => setInsurance(!insurance)} className='upper insurance'>
                        <h3>Insurance Information</h3>
                        <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
                    </div>
                    {
                        insurance && <div className='lower'>
                            <p>Insurance Provider: {data[0].insuranceProvider}</p>
                            <p>Policy Number: {data[0].policyNumber}</p>
                            <p>Copayment Info: {data[0].copaymentInfo}</p>

                        </div>
                    } </div>
                <div className="accordian_wrapper">

                    <div onClick={() => setEmergencyContacts(!emergencyContacts)} className='upper emergencyContacts'>
                        <h3>Emergency Contacts</h3>
                        <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
                    </div>
                    {
                        emergencyContacts && <div className='lower'>
                            <p>Emergency Contacts: {data[0].emergencyContacts}</p>
                        </div>
                    } </div>
                <div className="accordian_wrapper">

                    <div onClick={() => setOthers(!others)} className='upper others'>
                        <h3>Other Relevant Information</h3>
                        <div style={{ fontSize: "15px" }}> <IoIosArrowDown /></div>
                    </div>
                    {
                        others && <div className='lower'>
                            <p>Lifestyle Habits: {data[0].lifestyleHabits}</p>
                            <p>Occupational History: {data[0].occupationalHistory}</p>
                            <p>Dietary Preferences: {data[0].dietaryPreferences}</p>
                            <p>Blood Group: {data[0].bloodGroup}</p>
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
    )
}

export default PatientData2
