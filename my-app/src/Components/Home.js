import React, { useState } from 'react'
import Navbar from './Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import websitelogo from './imagesvid/websitelogo.png'
// import './HomeUpper.css'
import { Nav, NavDropdown, Container, Button } from 'react-bootstrap'

import { Link } from "react-router-dom";
// import BookingForm from './BookingForm';
// import Modal from "react-bootstrap/Modal";
import { Redirect } from 'react-router-dom'
// import "./Components/login/login.css"
// import axios from "axios"
import { useNavigate } from 'react-router-dom';
import "./Home.css"
import Footer from './Footer';
// import { useAuth0 } from "@auth0/auth0-react";
// ******************************************Modal Function**********************************************





const Home = () => {
  let navigate = useNavigate();
  // const { loginWithRedirect } = useAuth0();

  // const { user, isAuthenticated, isLoading } = useAuth0();
  const handleClick = () => {
    // {isAuthenticated?(navigate("/")):(loginWithRedirect())}
    navigate("/login");
  };
  return (
    <>



      <div className='row' style={{ backgroundColor: "#8F6DFF",width:"100%",height: "auto", color: "white" }} >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} className=" col-md-6  image">
          <img src="https://www.tamirapharmacy.com/login/svg/admin-img.svg" alt="img1" />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} className="col-md-6  ">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} className=" text-center">

            <div className='content'>
              <h1>Health Vault</h1>

              <h3 style={{ fontFamily: "Georgia", color: "white" }}>"Unlock Your Health's Past, Safeguard Your Future!"</h3>

              <button className="btnn" style={{ color: "black" }} onClick={handleClick}>Explore</button>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home;
