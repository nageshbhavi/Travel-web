import React, { useState } from "react";
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

function registerUser(ev){
  ev.preventDefault();
  axios.post('/register',{
    name,
    email,
    password,
  });
}

  return (
    <>
      <div>
        <Navbar />
        <div className="login-container">
          <h1 className="loginhead">Register</h1>
          <form className="loginform"  onSubmit={registerUser}>
            <input
              className="inputbox"
              type="text"
              placeholder="your name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <input
              className="inputbox"
              type="email"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <input
              className="inputbox"
              type="password"
              placeholder="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button type="submit">Register</button>
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
