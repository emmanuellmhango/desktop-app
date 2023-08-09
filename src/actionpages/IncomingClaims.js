import React from "react";
import Sidebar from "../components/Sidebar";
import Incoming from "./incoming/Incoming";

const IncomingClaims = () => {
  return (
    <div className="dashboardMainDiv1">
      <div className="dashboardMainDiv">
        <div className="allContent">
          <div className="sidebarMenu">
            <Sidebar />
          </div>
          <div className="claimsContentBody">
            <Incoming />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomingClaims;
