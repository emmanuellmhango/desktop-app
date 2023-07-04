import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../actionpages/fetchUsers";
import { addAppUsers } from "../state/appUsers";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import "../assets/styles/styles.css";
import { NavLink } from "react-router-dom";

const Main = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { appUsers } = useSelector((state) => state.appUsers);
  const [recentUsers, setRecentUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchUsers();
      dispatch(addAppUsers(response));
    };

    fetchData();
    newUsers(appUsers);
  }, []);

  const newUsers = (users) => {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const total = users.filter((user) => {
      const createdAt = new Date(user.created_at);
      return createdAt >= startOfDay && createdAt < endOfDay;
    }).length;
    setRecentUsers(total);
  };

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
        <div className="analyticsChartTable">
          <Line data={data} />
        </div>

        <div className="gridWrapper">
          <div class="gridItem">
            <span className="analyticsHeaderItemText">New Users</span>
            <br />
            <span className="analyticsHeaderItemNumber">
              {recentUsers ? recentUsers : 0}
            </span>
          </div>
          <div class="gridItem">
            <span className="analyticsHeaderItemText">All Users</span>
            <br />
            <span className="analyticsHeaderItemNumber">
              {appUsers ? appUsers.length : 0}
            </span>
          </div>
          <div class="gridItem">
            <span className="analyticsHeaderItemText">New Claims</span>
            <br />
            <span className="analyticsHeaderItemNumber">
              {appUsers ? appUsers.length : 0}
            </span>
          </div>
          <div class="gridItem">
            <span className="analyticsHeaderItemText">All Claims</span>
            <br />
            <span className="analyticsHeaderItemNumber">
              {appUsers ? appUsers.length : 0}
            </span>
          </div>
          <div class="gridItem">
            <span className="analyticsHeaderItemText">Clients</span>
            <br />
            <span className="analyticsHeaderItemNumber">
              {appUsers ? appUsers.length : 0}
            </span>
          </div>
          <NavLink to="/categories" className="dashboardMenuListLink">
            <div class="gridItem">
              <span className="analyticsHeaderItemText">Categories</span>
              <br />
              <span className="analyticsHeaderItemNumber">
                {appUsers ? appUsers.length : 0}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Main;
