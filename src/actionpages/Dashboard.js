import React, { useEffect } from "react";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";
import { addClaim } from "../state/claimsSlice";
import { fetchClaims } from "./claims/fetchClaims";
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
