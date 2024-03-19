import React, { useContext } from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../UserContext/UserContext";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const { user } = useContext(UserContext);

  return (
    <>
      <nav className="NavbarItems bg-primary">
        <h1 className="navbarlogo">TravelBuddy</h1>

        <div className="menu-icons" onClick={handleClick}>
          <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        <div className="navlg">
          <ul className={clicked ? "nav-menu active" : "nav-menu"}>
            <li>
              <Link to={"/"} className="navlinks">
                Home
              </Link>
            </li>
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
              <Link to={"/login"} className="signuplink">
                Sign Up
              </Link>
            </li>
            <Link to={"/login"}>
              {" "}
              <button className="signupbtn">
                <i className="fa-solid fa-bars  userIconbar"></i>
                <i className="fa-solid fa-circle-user fa-xl userIcon"></i>
                {!!user && (
                  <div className="username" style={{textDecoration: 'none'}}>
                    {user.USER_NAME}
                  </div>
                )}
              </button>
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
