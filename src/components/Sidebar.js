import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

import "../assets/styles/styles.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    navigate("/");
  };
  return (
    <>
      <div className="dashboardMenu">
        <ul className="dashboardMenuList">
          <NavLink to="/dashboard" className="dashboardMenuListLink">
            <li className="dashboardMenuListItem">Dashboard</li>
          </NavLink>
          <NavLink to="/map" className="dashboardMenuListLink">
            <li className="dashboardMenuListItem">Map</li>
          </NavLink>
          <NavLink to="/claims" className="dashboardMenuListLink">
            <li className="dashboardMenuListItem">All Claims</li>
          </NavLink>
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
