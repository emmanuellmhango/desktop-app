import React from "react";
import Sidebar from "../components/Sidebar";
import AllClaims from "./claims/AllClaims";

const Claims = () => {
  return (
    <div className="dashboardMainDiv1">
      <div className="dashboardMainDiv">
        <div className="allContent">
          <div className="sidebarMenu">
            <Sidebar />
          </div>
          <div className="claimsContentBody">
            <AllClaims />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Claims;
