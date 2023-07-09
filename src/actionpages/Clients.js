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

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${GENERAL_URL}/user_managements`);
      const { success, userClients } = response.data;
      if (success) {
        dispatch(addClient(userClients));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

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
