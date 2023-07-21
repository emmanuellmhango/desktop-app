import React from "react";
import Sidebar from "../components/Sidebar";
import Incoming from "./incoming/Incoming";

const IncomingClaims = () => {
  return (
    <div className="dashboardMainDiv">
      <div className="sidebarMenu">
        <Sidebar />
      </div>
      <div className="claimsContentBody">
        <Incoming />
      </div>
    </div>
  );
};

export default IncomingClaims;