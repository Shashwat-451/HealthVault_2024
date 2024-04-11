import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './MedicalRecordForm.css'
import Navbar from './Navbar';
function MedicalRecordForm() {
    const [labResults, setlabResults] = useState(null);
    const [imagingReports, setimagingReports] = useState(null);
    const [ecgReports, setecgReports] = useState(null);
    const [biopsyResults, setbiopsyResults] = useState(null);

    const handlelabResults = (e) => {
        setlabResults(e.target.files[0]);
    };
    const handleimagingReports = (e) => {
        setimagingReports(e.target.files[0]);
    };
    const handleecgReports = (e) => {
        setecgReports(e.target.files[0]);
    };
    const handlebiopsyResults = (e) => {
        setbiopsyResults(e.target.files[0]);
    };
    const handlelabResultsUpload = async () => {

        try {
            const formData = new FormData();
            if (user && user[0]) {
                formData.append('email', user[0].email)
            }
            formData.append('file', labResults);

            const response = await axios.post('https://healthvault-2024.onrender.com/fileUpload', formData);
            console.log(response.data);
            alert('File Uploaded successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to upload File');
        }
    };
    const handleimagingReportsUpload = async () => {

        try {
            const formData = new FormData();
            if (user && user[0]) {
                formData.append('email', user[0].email)
            }
            formData.append('file', imagingReports);

            const response = await axios.post('https://healthvault-2024.onrender.com/fileUpload', formData);
            console.log(response.data);
            alert('File Uploaded successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to upload File');
        }
    };
    const handleecgReportsUpload = async () => {

        try {
            const formData = new FormData();
            if (user && user[0]) {
                formData.append('email', user[0].email)
            }
            formData.append('file', ecgReports);

            const response = await axios.post('https://healthvault-2024.onrender.com/fileUpload', formData);
            console.log(response.data);
            alert('File Uploaded successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to upload File');
        }
    };
    const handlebiopsyResultsUpload = async () => {

        try {
            const formData = new FormData();
            if (user && user[0]) {
                formData.append('email', user[0].email)
            }
            formData.append('file', biopsyResults);

            const response = await axios.post('https://healthvault-2024.onrender.com/fileUpload', formData);
            console.log(response.data);
            alert('File Uploaded successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to upload File');
        }
    };

    const [user, setUser] = useState({})


    useEffect(() => {

        const userFromStorage = localStorage.getItem("user");
        if (userFromStorage) {
            setUser(JSON.parse(userFromStorage));
        }
    }, []);



    const [formData, setFormData] = useState({
        // Personal Information
        fullName: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        phoneNumber: '',
        email: '',
        // Medical History
        allergies: '',
        medicalConditions: '',
        familyHistory: '',
        surgeries: '',
        immunizations: '',
        medications: '',
        hospitalizations: '',
        // Vital Signs
        bloodPressure: '',
        heartRate: '',
        respiratoryRate: '',
        bodyTemperature: '',
        // Diagnostic Test Results
        labResults: '',
        imagingReports: '',
        ecgReports: '',
        biopsyResults: '',
        // Doctor's Notes and Consultation Reports
        progressNotes: '',
        consultationReports: '',
        // Insurance Information
        insuranceProvider: '',
        policyNumber: '',
        copaymentInfo: '',
        // Emergency Contacts
        emergencyContacts: '',

        // // Consent and Legal Documentation
        // hipaaAuthorization: '',
        // advanceDirectives: '',

        // Other Relevant Information
        lifestyleHabits: '',
        occupationalHistory: '',
        dietaryPreferences: '',
        // Blood Group
        bloodGroup: ''
    });

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



    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Inside the MedicalRecordForm component
    return (
        <>
        <Navbar/>
        <div className="medical-record-form">
            <h1>Personal Health Record Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="section-heading">Personal Information


                    <input placeholder='Name' type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />



                    <input placeholder='DOB' type="text" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onBlur={(e) => (e.target.type = "text")} onFocus={(e) => (e.target.type = "date")} onChange={handleChange} />



                    <input placeholder='Gender' type="text" id="gender" name="gender" value={formData.gender} onChange={handleChange} />



                    <input placeholder='Address' type="text" id="address" name="address" value={formData.address} onChange={handleChange} />



                    <input placeholder='Phone Number' type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />



                    <input placeholder='Email' type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

                </div>
                {/* Medical History */}
                <div className="section-heading">Medical History

                    <input placeholder='Blood Group:' type="text" id="bloodGroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
                    <textarea placeholder='Allergies' id="allergies" name="allergies" value={formData.allergies} onChange={handleChange}></textarea>



                    <textarea placeholder='Medical Condition' id="medicalConditions" name="medicalConditions" value={formData.medicalConditions} onChange={handleChange}></textarea>



                    <textarea placeholder='Family Medical History' id="familyHistory" name="familyHistory" value={formData.familyHistory} onChange={handleChange}></textarea>



                    <textarea placeholder='Surgical History' id="surgeries" name="surgeries" value={formData.surgeries} onChange={handleChange}></textarea>



                    <textarea placeholder='Immunization History' id="immunizations" name="immunizations" value={formData.immunizations} onChange={handleChange}></textarea>



                    <textarea placeholder='Medication History' id="medications" name="medications" value={formData.medications} onChange={handleChange}></textarea>



                    <textarea placeholder='Hospitalizations' id="hospitalizations" name="hospitalizations" value={formData.hospitalizations} onChange={handleChange}></textarea>

                </div>
                {/* Vital Signs */}
                <div className="section-heading">Vital Signs


                    <input placeholder='Blood Pressure' type="text" id="bloodPressure" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} />



                    <input placeholder='Heart Rate' type="text" id="heartRate" name="heartRate" value={formData.heartRate} onChange={handleChange} />



                    <input placeholder='Respiratory Rate' type="text" id="respiratoryRate" name="respiratoryRate" value={formData.respiratoryRate} onChange={handleChange} />



                    <input placeholder='Body Temperature' type="text" id="bodyTemperature" name="bodyTemperature" value={formData.bodyTemperature} onChange={handleChange} />

                </div>
                {/* Diagnostic Test Results */}

                {/* Doctor's Notes and Consultation Reports */}
                <div className="section-heading">Doctor's Notes and Consultation Reports


                    <textarea placeholder='Progress Notes:' id="progressNotes" name="progressNotes" value={formData.progressNotes} onChange={handleChange}></textarea>



                    <textarea placeholder='Consultation Reports:' id="consultationReports" name="consultationReports" value={formData.consultationReports} onChange={handleChange}></textarea>

                </div>
                {/* Insurance Information */}
                <div className="section-heading">Insurance Information


                    <input placeholder='Insurance Provider' type="text" id="insuranceProvider" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleChange} />



                    <input placeholder='Policy Number' type="text" id="policyNumber" name="policyNumber" value={formData.policyNumber} onChange={handleChange} />



                    <input placeholder='Copayment Information' type="text" id="copaymentInfo" name="copaymentInfo" value={formData.copaymentInfo} onChange={handleChange} />

                </div>
                {/* Emergency Contacts */}
                <div className="section-heading">Emergency Contacts


                    <textarea placeholder='Emergency Contacts' id="emergencyContacts" name="emergencyContacts" value={formData.emergencyContacts} onChange={handleChange}></textarea>

                </div>

                {/* Other Relevant Information */}
                <div className="section-heading">Other Relevant Information


                    <textarea placeholder='Lifestyle Habits:' id="lifestyleHabits" name="lifestyleHabits" value={formData.lifestyleHabits} onChange={handleChange}></textarea>



                    <textarea placeholder='Occupational History:' id="occupationalHistory" name="occupationalHistory" value={formData.occupationalHistory} onChange={handleChange}></textarea>



                    <textarea placeholder='Dietary Preferences or Restrictions:' id="dietaryPreferences" name="dietaryPreferences" value={formData.dietaryPreferences} onChange={handleChange}></textarea>

                </div>

                <div className="section-heading">Diagnostic Test Results

                    <label style={{ marginTop: "40px" }} htmlFor="labResults">Laboratory Test Results:</label>
                    <div className='box btnnn'>
                        <input className='reports' type='file' placeholder='Laboratory Test Results' id="labResults" name="labResults"  onChange={handlelabResults} ></input>
                        <button onClick={() => handlelabResultsUpload()}>Upload</button>
                    </div>


                    <label htmlFor="imagingReports">Imaging Reports:</label>
                    <div className='box btnnn'>
                        <input className='reports' type='file' placeholder='Imaging Reports' id="imagingReports" name="imagingReports"  onChange={handleimagingReports}></input>
                        <button onClick={() => handleimagingReportsUpload()}>Upload</button>
                    </div>
                    <label htmlFor="ecgReports">ECG/EKG Reports:</label>
                    <div className='box btnnn'>
                        <input className='reports' type='file' placeholder='ECG/EKG Reports' id="ecgReports" name="ecgReports"  onChange={handleecgReports}></input>
                        <button onClick={() => handleecgReportsUpload()}>Upload</button>
                    </div>
                    <label htmlFor="biopsyResults">Biopsy Results:</label>
                    <div className='box btnnn'>
                        <input className='reports' type='file' placeholder='Biopsy Results' id="biopsyResults" name="biopsyResults"  onChange={handlebiopsyResults}></input>
                        <button onClick={() => handlebiopsyResultsUpload()}>Upload</button>
                    </div>

                </div>

                <div style={{ display: "flex", flexDirection: "column", marginTop: "30px" }} className='btnnn box'>
                    <button type="submit">Submit</button>
                </div>

                {/* Submit Button */}

            </form>
        </div>
        </>
    );

}

export default MedicalRecordForm
