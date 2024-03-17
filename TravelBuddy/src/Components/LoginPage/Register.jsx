import React, { useState } from "react";
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Validation from "./SignupValidation";

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
      <div>
        <Navbar />
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
