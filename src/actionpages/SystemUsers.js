import React from "react";
import Sidebar from "../components/Sidebar";
import SystemUser from "./systemusers/SystemUserForm";
import SystemUserList from "./systemusers/SystemUserList";

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
            <div className="clientForm">
              <SystemUser />
            </div>
            <div className="userManagementList">
              <SystemUserList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemUsers;
