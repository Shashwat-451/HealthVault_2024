import React, { useState, useEffect } from "react";
import "./Navbar.css";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch,useSelector } from "react-redux";
import {setLoggedIn} from '../Redux/Slices/AuthSlice'
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  // const [loggedIn, setLoggedIn] = useState(false);
  // const tokenn = localStorage.getItem("token");
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setLoggedIn(true);
  //   } else {
  //     setLoggedIn(false);
  //   }
  // }, [tokenn]);

  const loggedIn=useSelector(state=>state.loggedIn)
 const dispatch=useDispatch()

  const handleLogout = () => {
    // Perform logout actions here
    localStorage.removeItem("token");
    dispatch(setLoggedIn(false));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setLoggedIn(true));
    } else {
      dispatch(setLoggedIn(false));
    }
  }, []); 


  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <h2>
            <span>H</span>ealt
            <span>V</span>ault
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/patientkdata">View Record</NavLink>
            </li>
            <li>
              <NavLink to="/medform">Edit Record</NavLink>
            </li>
            <li>
              <NavLink to="/qr">Get QR</NavLink>
            </li>
            {!loggedIn && (
              <>
                <li>
                  <NavLink to="/login">Sign In</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            )}
            {loggedIn && (
              <li>
                <NavLink to="/" onClick={()=>handleLogout()}>
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="social-media">
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
