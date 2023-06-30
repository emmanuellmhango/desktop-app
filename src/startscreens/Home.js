import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../assets/styles/styles.css";

const Home = () => {
  const navigate = useNavigate();

  const handlePress = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <div className="mainDiv">
      <div className="logoHeader">
        <picture>
          <img src={logo} alt="logo" className="logo" />
        </picture>
      </div>
      <div className="title">
        <span className="primaryColor">Administrator Dashboard</span>
      </div>
      <div className="loginButtonDiv">
        <button className="loginButton" onClick={(event) => handlePress(event)}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
