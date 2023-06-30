import React from "react";
import Sidebar from "../components/Sidebar";

const Map = () => {
  return (
    <div className="dashboardMainDiv">
      <div className="sidebarMenu">
        <Sidebar />
      </div>
      <div className="contentBody">Map</div>
    </div>
  );
};

export default Map;
