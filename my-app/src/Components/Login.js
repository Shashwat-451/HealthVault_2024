import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {setLoginUser} from '../Redux/Slices/AuthSlice'
import {setLoggedIn} from '../Redux/Slices/AuthSlice'
import {setToken} from '../Redux/Slices/AuthSlice'
import './Login.css';
const LoginPage = () => {
    let navigate = useNavigate();
    const dispatch=useDispatch();
     
    function handleClicking() {
      navigate('/register');
  
    }

    
    const [user, setUser] = useState({
  
      email: "",
      password: ""
    })
  
    const handleChange = e => {
      const { name, value } = e.target // whatever change takes place after writing in form gets stored in event continuously and then we extract name and value from there in next line.
      // console.log(name,value);
      setUser({
        ...user, //all else value same
        [name]: value  //change the name attribute to value
  
      })
    }
  
  
    const login = () => {
      axios.post("https://healthvaultfinal2.onrender.com/login", user)
        .then(res => {
          if (res.status >= 200 && res.status < 300) {
            alert(res.data.message);
            console.log("toke",res.data.token)
            console.log("response is",res);
            dispatch(setLoginUser(res.data.existinguser[0]));
            dispatch(setToken(res.data.token));
            dispatch(setLoggedIn(true));
            localStorage.setItem("token", JSON.stringify(res.data.token))
            localStorage.setItem("user", JSON.stringify(res.data.existinguser))
            
            const tokenu=localStorage.getItem("token")
            console.log("ttt",tokenu)
            navigate("/patientData");
          } else {
            alert("Login failed. Please check your credentials and try again.");
          }
        })
        .catch(error => {
          alert("An error occurred while logging in. Please try again later.");
          console.error(error);
        });
    };
    
  
  
    return (
      <>

       <div className='loginformclass'>
        
       
         
          <div className='itemsloginform'>
           
              <h1 style={{marginBottom:"40px",marginTop:"30px",color:"white",fontFamily:"Georgia"}}className='text-center'>LOGIN</h1>
              
              <input type="text" name="email" value={user.email} placeholder="Enter your Email" onChange={handleChange}></input>
          
              
              <input type="password" name="password" value={user.password} placeholder="Enter your password" onChange={handleChange}></input>
      
           
              <div >
              <button  className='btnclass' onClick={login}>Login</button>
              </div>
            
              
              <div style={{color:'white'}}>
              <h5 style={{fontFamily:"Georgia",fontSize:"14px"}}>Don't have an Account?</h5>
              </div>
              
              <div className='items'>
              <div   style={{marginBottom:"10px",marginTop:"-6px"}} >
              <button className='btnclass' onClick={handleClicking}>Sign Up</button>
              </div>
              </div>
            </div>
          
        </div>
       
  
        {/* <div className="outer_divv2">
          <img src="https://wallpaperaccess.com/full/176600.jpg" alt="img" />
          <div className="apps contentt">
       
          </div>
        </div> */}
     
      </>
    )
  }

export default LoginPage;
