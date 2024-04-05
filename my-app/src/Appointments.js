import React from "react"
import { useState,useEffect } from "react";
import './Appointment.css'
const Appointments = (props) => {
    const [divData, setDivData] = useState([]);
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [comment, setComment] = useState([]);

    useEffect(() => {
      // Load existing div data from localStorage on component mount
      const storedDivData = JSON.parse(localStorage.getItem('storedDivData'));
      if (storedDivData) {
        setDivData(storedDivData);
      }
    }, []);
  
    const handleDivCreation = () => {
      const newDivData = 'This is a dynamically created div.';
      const newDivs = [...divData, newDivData];
      setDivData(newDivs);
      localStorage.setItem('storedDivData', JSON.stringify(newDivs));
    };
  
    return (
      <div className="App">
        <h1>Patient Appointment History</h1>
        <form>
            <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
            <input type="time" id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)}></input>
            <input type="text" id="doctor" name="doctor" value={doctor} onChange={(e) => setDoctor(e.target.value)}></input>
            <input type="text" id="comment" name="comment" value={comment} onChange={(e) => setComment(e.target.value)}></input>
        </form>
        <button onClick={handleDivCreation}>Create Div</button>
        <div className="created-div-container">
          {divData.map((text, index) => (
            <div key={index} className="dynamic-div">
                <div className="date">{date}</div>
                <div className="time">{time}</div>
                <div className="doctor">{doctor}</div>
                <div className="comment">{comment}</div>
            </div>
          ))}
        </div>
      </div>
    );
  
  
  
      
};




export default Appointments;

