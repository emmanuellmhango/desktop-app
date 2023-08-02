import React, { useEffect } from "react";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";
import { addClaim } from "../state/claimsSlice";
import { fetchClaims } from "./claims/fetchClaims";
import { addClient } from "../state/clientSlice";
import { fetchUserClients } from "./clients/fetchClients";
import { fetchCategories } from "./categories/fetchCategories";
import { addCategory } from "../state/categorySlice";
import Logo from "../assets/images/logo.png";
import "../assets/styles/styles.css";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClaimsData = async () => {
      const claimData = await fetchClaims();
      dispatch(addClaim(claimData));
    };

    fetchClaimsData();
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    const fetchUserClientData = async () => {
      const clientData = await fetchUserClients();
      dispatch(addClient(clientData));
    };

    fetchUserClientData();
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      const categoryDate = await fetchCategories();
      dispatch(addCategory(categoryDate));
    };

    fetchAllCategories();
    return () => {};
  }, []);

  return (
    <div className="dashboardMainDiv1">
      <div className="dashboardMainDiv">
        <div className="headingSpace">
          <div className="innerSpace">
            <div className="logoimage">
              <img src={Logo} alt="Logo" className="headerLogo" />
            </div>
            <div className="headingTitle">TAGET DASHBOARD</div>
          </div>
        </div>
        <div className="allContent">
          <div className="sidebarMenu">
            <Sidebar />
          </div>
          <div className="contentBody">
            <div className="dashboardHeading">Dashboard Analytics</div>
            <Main />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
