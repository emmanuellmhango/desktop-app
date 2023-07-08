import React from "react";
import Sidebar from "../components/Sidebar";
import AllClaims from "./claims/AllClaims";

const Claims = () => {
  return (
    <div className="dashboardMainDiv">
      <div className="sidebarMenu">
        <Sidebar />
      </div>
      <div className="claimsContentBody">
        <AllClaims />
      </div>
    </div>
  );
};

export default Claims;
