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
  const { clients } = useSelector((state) => state.clients);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${GENERAL_URL}/clients`);
      const { success, clients } = response.data;
      if (success) {
        dispatch(addClient(clients));
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
      <div className="categoryBody">
        <div className="clientForm">
          <ClientForm />
        </div>
        <div className="categoriesList">
          <ClientList clients={clients} />
        </div>
      </div>
    </div>
  );
};

export default Clients;
