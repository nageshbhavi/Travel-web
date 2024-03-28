import React, { useContext } from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from "../UserContext/UserContext";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const { user } = useContext(UserContext);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user information from localStorage when component mounts
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <nav className="NavbarItems">
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
              <Link to={user?"/account":"/login"} className="signuplink">
                <div style={user?{display:"none"}:{display:"block"}}> {"Sign Up"}</div>

                {!!user && userData && (
                  <div className="username" style={{ textDecoration: "none" }}>
                    <i className="fa-solid fa-circle-user fa-xl userIcon"></i>
                    {userData.USER_NAME}
                  </div>
                )}
              </Link>
            </li>
            <Link to={user?"/account":"/login"} className="signupbtn">
              {" "}
              {/* <button className="signupbtn">              </button> */}
              <i className="fa-solid fa-bars  userIconbar"style={user?{display:"none"}:{display:"block"}} ></i>
              <i className="fa-solid fa-circle-user fa-xl userIcon"></i>
              {!!user && userData && (
                <div className="username" style={{ textDecoration: "none" }}>
                  {(userData.USER_NAME)}
                </div>
              )}
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
