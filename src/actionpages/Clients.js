import React from "react";
import Sidebar from "../components/Sidebar";
import ClientForm from "./clients/ClientForm";
import ClientList from "./clients/ClientList";
import "../assets/styles/styles.css";

const Clients = () => {
  return (
    <div className="dashboardMainDiv1">
      <div className="dashboardMainDiv">
        <div className="headingSpace"></div>
        <div className="allContent">
          <div className="sidebarMenu">
            <Sidebar />
          </div>
          <div className="usermanagementContainerBody">
            <div className="clientForm">
              <ClientForm />
            </div>
            <div className="userManagementList">
              <ClientList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
