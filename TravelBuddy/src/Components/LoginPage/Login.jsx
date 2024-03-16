import React, { useState } from "react";
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import Home from "../Home/Home";
import Validation from "./LoginValidation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState("");

  function loginuser(ev) {
    ev.preventDefault();
    setErrors(Validation(email, password));
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
