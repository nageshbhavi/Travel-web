import React, { useState } from "react";
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Validation from "./SignupValidation";
import video from '../../assets/video1.mp4';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  function registerUser(ev) {
    ev.preventDefault();
    setErrors(Validation(name, email, password));
    if (errors.name === "" && errors.email === "" && errors.password === "") {
      axios
        .post("/register", {
          name,
          email,
          password,
        })
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            alert("Email already exists!");
            console.log(err);
          } else {
            console.log("Registration failed. Please try again later.");
          }
        });
    }
  }

  return (
    <>
      <div className="loginpage">
        <Navbar />
        <div
          className="overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        ></div>
        <video autoPlay loop muted src={video} type="video/mp4" style={{width:"100%", height:"100%", objectFit:"cover"}} ></video>
        <div className="login-container">
          <h1 className="loginhead">Register</h1>
          <form className="loginform" onSubmit={registerUser}>
            <input
              className="inputbox"
              type="text"
              placeholder="your name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            {errors.name && (
              <span style={{ color: "red", fontSize: "13px" }}>
                {errors.name}
              </span>
            )}
            <input
              className="inputbox"
              type="email"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            {errors.email && (
              <span style={{ color: "red", fontSize: "13px" }}>
                {errors.email}
              </span>
            )}
            <input
              className="inputbox"
              type="password"
              placeholder="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            {errors.password && (
              <span style={{ color: "red", fontSize: "13px" }}>
                {errors.password}
              </span>
            )}
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
