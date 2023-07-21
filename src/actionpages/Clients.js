import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar";
import ClientForm from "./clients/ClientForm";
import ClientList from "./clients/ClientList";
import { addClient } from "../state/clientSlice";
import axios from "axios";
import { GENERAL_URL } from "../state/url";
import "../assets/styles/styles.css";

const Clients = () => {
  const dispatch = useDispatch();

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
