import React from "react";
import Sidebar from "../components/Sidebar";
import ClientForm from "./clients/ClientForm";
import ClientList from "./clients/ClientList";
import "../assets/styles/styles.css";

const Clients = () => {
  return (
    <div className="dashboardMainDiv">
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
  );
};

export default Clients;
