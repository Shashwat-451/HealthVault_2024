import React, { useState, useEffect } from "react";
import './Appointment.css';
import axios from 'axios';
import { setAppointmentss } from "./Redux/Slices/AuthSlice";
import { useDispatch, useSelector } from 'react-redux';

const Appointments = (props) => {
    const [appointment, setAppointment] = useState({
      date: '',
      time: '',
      address: '',
      doctor: '',
      email: ''
    });

    const [user,setUser]=useState({})
    const [appointments, setAppointments] = useState([]);

    // let user = useSelector(state => state.user);
    // console.log("user from redux",user);
    const appointmentsFromStore = useSelector(state => state.appointments);
  
    // console.log("ewoiho",user);
    // useEffect hook to update data when user changes
   
  
      
      
 

    
    useEffect(() => {
      const appointmentsFromStorage = localStorage.getItem("appointments");
      if (appointmentsFromStorage) {
        setAppointments(JSON.parse(appointmentsFromStorage));
      }
    }, []);
    useEffect(() => {
      const userFromStorage = localStorage.getItem("user");
      if (userFromStorage) {
        setUser(JSON.parse(userFromStorage));
      }
    }, []);

    // useEffect(() => {
    //   const user2=localStorage.getItem("user");
    //   console.log("user from localstorage",user);
    //   user=JSON.parse(user2);
    //   console.log(user);
    // }, []);


    useEffect(() => {
        if (Array.isArray(appointmentsFromStore)) {
            setAppointments(appointmentsFromStore);
        }
    }, [appointmentsFromStore]);

    const dispatch = useDispatch();

    const handleDelete = async(index,doctor,time) => {
      console.log(index,doctor,time);
      const newAppointments = appointments.filter((_, i) => i !== index);
      setAppointments(newAppointments);
      localStorage.setItem("appointments", JSON.stringify(newAppointments)); // stringify the array before storing
      
      try {
        // Send DELETE request to delete appointment by ID
        await axios.delete(`https://healthvault-2024.onrender.com/appointments/delete`,{
          data: { doctor, time }
        });
        // If deletion is successful, remove the appointment from the state
        alert('Appointment deleted successfully!');
    } catch (error) {
        console.error('Failed to delete appointment:', error);
        alert('Failed to delete appointment. Please try again later.');
    }
    };

    const handleChange = (event) => {
       const { name, value } = event.target;
       setAppointment({ ...appointment, [name]: value });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("USERRR",user);
      console.log("EMAIL",user[0].email);
      appointment.email = user && user[0].email ? user[0].email : '';
      console.log("Appointment from emailu",user);
      console.log("email frontend",appointment.email);
      setAppointments([...appointments, appointment]);
      localStorage.setItem("appointments", JSON.stringify([...appointments, appointment]));
      try {
        const response = await axios.post('http://localhost:9000/appointments', appointment);
        console.log("aefe",response.data);
        alert('Patient information saved successfully!');
      } catch (error) {
        console.error(error);
        alert('Failed to save patient information. Please try again later.');
      }
    
      setAppointment({
        date: '',
        time: '',
        address: '',
        doctor: ''
      });
    };

    return (
      <div className="wrapper">
         <div className="Logo">
          Appointments
        </div>
        <form className="formm" onSubmit={handleSubmit}>
            <input type="text" placeholder="Select Date" onBlur={(e) => (e.target.type = "text")} onFocus={(e) => (e.target.type = "date")}    id="date" name="date" value={appointment.date} onChange={handleChange}></input>
            <input type="text" placeholder="Select Time" onBlur={(e) => (e.target.type = "text")} onFocus={(e) => (e.target.type = "time")}   id="time" name="time" value={appointment.time} onChange={handleChange}></input>
            <input placeholder="Enter Address" type="text" id="address" name="address" value={appointment.address} onChange={handleChange}></input>
            <input placeholder="Enter Doctor's Name" type="text" id="doctor" name="doctor" value={appointment.doctor} onChange={handleChange}></input>
            <button type="submit">Save Appointment</button>
        </form>
        <div className="container">
          {appointments.map((element, index) => (
      
            <div key={index} className="cards">
              {console.log("indexwa",index)}
              <table className="details-table">
                <tbody>
                  <tr>
                    <td>Appointment Date:</td>
                    <td>{element.date}</td>
                  </tr>
                  <tr>
                    <td>Appointment Time:</td>
                    <td>{element.time}</td>
                  </tr>
                  <tr>
                    <td>Clinic's Address:</td>
                    <td>{element.address}</td>
                  </tr>
                  <tr>
                    <td>Doctor's Name:</td>
                    <td>{element.doctor}</td>
                  </tr>
                </tbody>
              </table>
              <div className="btn">
              {console.log("verre",element._id)}
                <button onClick={() => handleDelete(index,element.doctor,element.time)}>Remove Appointment</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Appointments;
