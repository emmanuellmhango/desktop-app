import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import URL from "../state/url";
import logo from "../assets/images/logo.png";
import LoadingSpinner from "./Spinner";
import { addUser } from "../state/userSlice";
import "../assets/styles/styles.css";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const email = event.target.email.value;
    const password = event.target.password.value;
    const data = { email, password };
    // console.log(data);
    try {
      await axios
        .get(
          URL,
          { params: data },
          {
            headers: {
              "Content-Type": "application/JSON",
            },
          }
        )
        .then((response) => {
          setIsLoading(false);
          const { success, user } = response.data;
          if (success) {
            dispatch(addUser(user));
            localStorage.setItem(
              "4E2hT6rG8nL1wY5zI3O9K7sD0X6yF7lP",
              JSON.stringify(user)
            );
            navigate("/dashboard");
          } else {
            alert("Wrong email or password, please try again!");
          }
        })
        .catch(() => {
          setIsLoading(false);
          alert("Oops! Something went wrong, please try again");
        });
    } catch (error) {
      setIsLoading(false);
      alert("Oops! Something went wrong, please check your network");
    }
  };
  return (
    <div className="mainDiv">
      <div className="loginLogoHeader">
        <picture>
          <img src={logo} alt="logo" className="logo" />
        </picture>
      </div>
      {isLoading ? <LoadingSpinner /> : null}
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
          <button className="login" type="submit" disabled={isLoading}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
