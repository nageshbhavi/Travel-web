import React from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);


  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleMenu = () => {
    setClicked(!clicked);
  };
  return (
    <>
      <nav className="NavbarItems bg-primary">
        <h1 className="navbarlogo">TravelBuddy</h1>

        <div className="menu-icons" onClick={handleClick}>
          <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        <ul onClick={handleMenu}
          className={clicked ? "nav-menu active" : "nav-menu"}>
          <li>
            <Link className="navlinks">Destinations</Link>
          </li>
          <li>
            <Link className="navlinks">About Us</Link>
          </li>
          <li>
            <Link className="navlinks">Gallery</Link>
          </li>
          <li>
            <Link className="navlinks">Contact Us</Link>
          </li>
          <li>
            <Link to={"/login"} className="signuplink">
              Sign Up
            </Link>
          </li>
          <Link to={"/login"}>
            {" "}
            <button className="signupbtn">Sign Up</button>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;



