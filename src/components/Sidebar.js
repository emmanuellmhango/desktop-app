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
        <ul className="dashboardMenuListSB">
          <NavLink to="/dashboard" className="dashboardMenuListLink">
            <li className="dashboardMenuListItem">Dashboard</li>
          </NavLink>
          <NavLink to="/map" className="dashboardMenuListLink">
            <li className="dashboardMenuListItem">Map</li>
          </NavLink>
          <NavLink to="/claims" className="dashboardMenuListLink">
            <li className="dashboardMenuListItem">All Claims</li>
          </NavLink>
          <NavLink to="/incoming-claims" className="dashboardMenuListLink">
            <li className="dashboardMenuListItem">Incoming Claims</li>
          </NavLink>
          <NavLink to="/clients" className="dashboardMenuListLink">
            <li className="dashboardMenuListItem">Client Management</li>
          </NavLink>
          <NavLink to="/categories" className="dashboardMenuListLink">
            <li className="dashboardMenuListItem">Categories</li>
          </NavLink>
          <NavLink to="/users" className="dashboardMenuListLink">
            <li className="dashboardMenuListItem">Mobile Users</li>
          </NavLink>
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
