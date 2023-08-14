import React from "react";
import Sidebar from "../components/Sidebar";
import SubClientList from "./clients/SubClientList";
import "../assets/styles/styles.css";

const SubClients = () => {
  return (
    <div className="dashboardMainDiv1">
      <div className="dashboardMainDiv">
        <div className="allContent">
          <div className="sidebarMenu">
            <Sidebar />
          </div>
          <div className="categoryBody">
            <div className="userManagementListSub">
              <SubClientList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubClients;
