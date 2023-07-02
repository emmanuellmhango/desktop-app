import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../state/url";
import logo from "../assets/images/logo.png";
import "../assets/styles/styles.css";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const data = { email, password };
    // console.log(data);
    try {
      const response = await axios.get(
        URL,
        { params: data },
        {
          headers: {
            "Content-Type": "application/JSON",
          },
        }
      );
      const { success, user } = response.data;
      console.log(response.data);
      // if (success) {
      //   localStorage.setItem("user", JSON.stringify(user));
      //   navigate("/dashboard");
      // } else {
      //   alert("Wrong email or password, please try again!");
      // }
    } catch (error) {
      console.log(error);
    }
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
            id="email"
            name="email"
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
