import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import "../assets/styles/styles.css";

const Main = () => {
  const labels = ["January", "February", "March", "April", "May", "June"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Claims",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  return (
    <div className="dashboardAnalytics">
      <div className="analyticsChartContainer">
        <div className="analyticsHeader">
          <div className="analyticsHeaderItem">
            <span className="analyticsHeaderItemText">New Users</span>
            <span className="analyticsHeaderItemNumber">100</span>
          </div>
          <div className="analyticsHeaderItem">
            <span className="analyticsHeaderItemText">Incoming Claims</span>
            <span className="analyticsHeaderItemNumber">50</span>
          </div>
          <div className="analyticsHeaderItem">
            <span className="analyticsHeaderItemText">New Clients</span>
            <span className="analyticsHeaderItemNumber">50</span>
          </div>
        </div>
        <div className="analyticsChartTable">
          <Line data={data} />
        </div>
        <div className="analyticsHeader">
          <div className="analyticsHeaderItem">
            <span className="analyticsHeaderItemText">Total Users</span>
            <span className="analyticsHeaderItemNumber">100</span>
          </div>
          <div className="analyticsHeaderItem">
            <span className="analyticsHeaderItemText">Total Claims</span>
            <span className="analyticsHeaderItemNumber">50</span>
          </div>
          <div className="analyticsHeaderItem">
            <span className="analyticsHeaderItemText">Total Clients</span>
            <span className="analyticsHeaderItemNumber">50</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
