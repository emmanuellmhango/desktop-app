import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../assets/styles/styles.css";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };
  return (
    <div className="mainDiv">
      <div className="loginLogoHeader">
        <picture>
          <img src={logo} alt="logo" className="logo" />
        </picture>
      </div>
      <form className="loginForm" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username" className="labels">
            Email
          </label>
          <br />
          <input
            type="email"
            id="username"
            name="username"
            className="form-control-input glow"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="labels">
            Password
          </label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            className="form-control-input glow"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="form-group widthButton">
          <button className="login" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
