import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

import "../assets/styles/styles.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    navigate("/");
  };
  return (
    <>
      <div className="dashboardLogoHeader">
        <picture>
          <img src={logo} alt="logo" className="logo" />
        </picture>
      </div>
      <div className="dashboardMenu">
        <ul className="dashboardMenuList">
          <li className="dashboardMenuListItem">
            <a href="/dashboard" className="dashboardMenuListLink">
              Dashboard
            </a>
          </li>
          <li className="dashboardMenuListItem">
            <a href="/dashboard" className="dashboardMenuListLink">
              Map
            </a>
          </li>
          <li className="dashboardMenuListItem">
            <a href="/dashboard" className="dashboardMenuListLink">
              All Claims
            </a>
          </li>
          <li className="dashboardMenuListItem">
            <a href="/dashboard" className="dashboardMenuListLink">
              Incoming Claims
            </a>
          </li>
          <li className="dashboardMenuListItem">
            <a href="/dashboard" className="dashboardMenuListLink">
              User Management
            </a>
          </li>
        </ul>
        <div className="logoutButtonDiv">
          <button
            className="logoutButton"
            onClick={(event) => handleLogout(event)}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
