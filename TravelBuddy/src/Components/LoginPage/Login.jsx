import React from "react";
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import Home from "../Home/Home";

const Login = () => {
  return (
    <>
      <Navbar />
      <div>
        <div className="login-container">
          <h1 className="loginhead">Login</h1>
          <form className="loginform">
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
            <button>Login</button>
            <div className="reglink">
              Don't have an account yet?<Link to={"/register"}>Register</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
