import React from "react";
import Sidebar from "../components/Sidebar";
import "../assets/styles/styles.css";

const SystemUsers = () => {
  return (
    <div className="dashboardMainDiv1">
      <div className="dashboardMainDiv">
        <div className="allContent">
          <div className="sidebarMenu">
            <Sidebar />
          </div>
          <div className="categoryBody">
            <div className="clientForm">Test</div>
            <div className="userManagementList">Test</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemUsers;
