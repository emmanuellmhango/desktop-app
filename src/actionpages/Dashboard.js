import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./fetchUsers";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import "../assets/styles/styles.css";

const Dashboard = () => {
  return (
    <div className="dashboardMainDiv">
      <div className="sidebarMenu">
        <Sidebar />
      </div>
      <div className="contentBody">
        <Main />
      </div>
    </div>
  );
};

export default Dashboard;
