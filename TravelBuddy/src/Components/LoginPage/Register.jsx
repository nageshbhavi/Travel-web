import React from "react";
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="login-container">
          <h1 className="loginhead">Register</h1>
          <form className="loginform">
            <input className="inputbox" type="text" placeholder="your name" />
            <input
              className="inputbox"
              type="email"
              placeholder="youremail@gmail.com"
            />
            <input
              className="inputbox"
              type="password"
              placeholder="password"
            />
            <button>Register</button>
            <div className="reglink">
              Already have an account?<Link to={"/login"}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
