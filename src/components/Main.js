import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchUsers } from "../actionpages/fetchUsers";
import { addAppUsers } from "../state/appUsers";
import { addCategory } from "../state/categorySlice";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { fetchCategories } from "../actionpages/fetchCategories";
import "../assets/styles/styles.css";

const Main = () => {
  const dispatch = useDispatch();
  const { appUsers } = useSelector((state) => state.appUsers);
  const { categories } = useSelector((state) => state.categories);
  const { clients } = useSelector((state) => state.clients);
  const { claims } = useSelector((state) => state.claims);
  const [recentUsers, setRecentUsers] = useState(0);
  const [recentClients, setRecentClients] = useState(0);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const customMonthOrder = (month) => {
    return months.indexOf(month);
  };

  const claimDataForGraph = () => {
    const counters = [];
    const currentYr = new Date().getFullYear();

    claims.forEach((claim) => {
      const claim_date = new Date(claim.created_at);
      const claim_year = claim_date.getFullYear();
      const claim_month = claim_date.getMonth();

      if (claim_year === currentYr) {
        const existingCounter = counters.find(
          (item) => item.month === months[claim_month]
        );

        if (existingCounter) {
          existingCounter.counter += 1;
        } else {
          counters.push({ month: months[claim_month], counter: 1 });
        }
      }
    });

    months.forEach((month) => {
      const getc = counters.find((item) => item.month === month);
      if (!getc) {
        counters.push({ month: month, counter: 0 });
      }
    });

    const claimsforGraph = counters.sort(
      (a, b) => customMonthOrder(a.month) - customMonthOrder(b.month)
    );

    return claimsforGraph;
  };

  useEffect(() => {
    const fetchAllCategories = async () => {
      const response = await fetchCategories();
      dispatch(addCategory(response));
    };

    fetchAllCategories();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchUsers();
      dispatch(addAppUsers(response));
    };

    fetchData();
    newUsers(appUsers);
  }, []);

  useEffect(() => {
    newClients(clients);
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

  const newClients = (clients) => {
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

    const total = clients.filter((user) => {
      const createdAt = new Date(user.created_at);
      return createdAt >= startOfDay && createdAt < endOfDay;
    }).length;
    setRecentClients(total);
  };

  const labelData = claims
    ? claimDataForGraph(claims).map((item) => item.month)
    : [...months];
  const labels = ["", ...labelData];
  const dataSetData = claims
    ? claimDataForGraph(claims).map((item) => item.counter)
    : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Claims",
        backgroundColor: "rgb(94, 43, 255)",
        borderColor: "rgb(94, 43, 255)",
        data: [0, ...dataSetData],
      },
    ],
  };

  return (
    <div className="dashboardAnalytics">
      <div className="analyticsChartContainer">
        <div className="dashboardHeading">
          <h3 className="title">Dashboard Analytics</h3>
        </div>
        <div className="headerMenuContainer">
          <div className="gridItem">
            <span className="analyticsHeaderItemText">New Users</span>
            <br />
            <span className="analyticsHeaderItemNumber">
              {recentUsers ? recentUsers : 0}
            </span>
          </div>
          <div className="gridItem2">
            <div classname="gridItem2Container">
              <span className="analyticsHeaderItemText">New Claims</span>
              <br />
              <span className="analyticsHeaderItemNumber">
                {appUsers ? appUsers.length : 0}
              </span>
              <div className="test">
                <span className="reports-seven-days">Reports of 7 days</span>
              </div>
            </div>
          </div>
          <div className="gridItem">
            <span className="analyticsHeaderItemText">New Clients</span>
            <br />
            <span className="analyticsHeaderItemNumber">
              {recentClients ? recentClients : 0}
            </span>
          </div>
        </div>
        <div className="analyticsChartTable">
          <Line data={data} />
        </div>
        <div className="headerMenuContainer">
          <div className="gridItem">
            <span className="analyticsHeaderItemText">Total Users</span>
            <br />
            <span className="analyticsHeaderItemNumber">
              {appUsers ? appUsers.length : 0}
            </span>
          </div>
          <div className="gridItem">
            <span className="analyticsHeaderItemText">Total Claims</span>
            <br />
            <span className="analyticsHeaderItemNumber">
              {appUsers ? appUsers.length : 0}
            </span>
          </div>
          <div className="gridItem">
            <span className="analyticsHeaderItemText">Total Clients</span>
            <br />
            <span className="analyticsHeaderItemNumber">
              {clients ? clients.length : 0}
            </span>
          </div>
        </div>

        {/* 
          <NavLink to="/categories" className="dashboardMenuListLink">
            <div className="gridItem">
              <span className="analyticsHeaderItemText">Categories</span>
              <br />
              <span className="analyticsHeaderItemNumber">
                {categories ? categories.length : 0}
              </span>
            </div>
          </NavLink>
        </div> */}
      </div>
    </div>
  );
};

export default Main;
