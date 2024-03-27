import React, { useContext, useState } from "react";
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Validation from "./LoginValidation";
import { UserContext } from "../UserContext/UserContext";
import video from '../../assets/video1.mp4';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

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
          if (res.status === 200) {
            alert("Login Successful!");
            setUser(res.data); // Set user data in context
            navigate("/");
          } else {
            alert("Invalid user!");
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            alert("Invalid Email or Password!");
            console.log(err);
          } else {
            console.log("Login failed. Please try again later.");
          }
        });
    }
  }

  return (
    <>
      <Navbar />
      <div className="loginpage">
      <video autoPlay loop muted src={video} type="video/mp4" style={{width:"100%", height:"100%", objectFit:"cover"}} ></video>
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
              Don't have an account yet?
              <Link to={"/register"}>Register</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
