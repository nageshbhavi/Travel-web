import React, { useState } from "react";
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "../Home/Home";
import Validation from "./LoginValidation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  function loginuser(ev) {
    ev.preventDefault();
    setErrors(Validation(email, password));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("/login", {
          email,
          password,
        })
        .then((res) => {
          if(res.data === 'success'){
            navigate('/')
          }
          else{
            alert("invalid user!")
          }
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <>
      <Navbar />
      <div>
        <div className="login-container">
          <h1 className="loginhead">Login</h1>
          <form className="loginform" onSubmit={loginuser}>
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
            <button type="submit">Login</button>
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
