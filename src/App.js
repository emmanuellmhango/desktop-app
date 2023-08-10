import React from "react";
import { Routes, Route, HashRouter as Router } from "react-router-dom";
import Login from "./startscreens/Login";
import Home from "./startscreens/Home";
import Dashboard from "./actionpages/Dashboard";
import Map from "./actionpages/Map";
import Claims from "./actionpages/Claims";
import Categories from "./actionpages/Categories";
import Clients from "./actionpages/Clients";
import UserManagement from "./actionpages/UserManagement";
import IncomingClaims from "./actionpages/IncomingClaims";
import SystemUsers from "./actionpages/SystemUsers";

const App = () => {
  return (
    <Router hashType="noslash">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/map" element={<Map />} />
        <Route exact path="/claims" element={<Claims />} />
        <Route exact path="/categories" element={<Categories />} />
        <Route exact path="/clients" element={<Clients />} />
        <Route exact path="/users" element={<UserManagement />} />
        <Route exact path="/incoming-claims" element={<IncomingClaims />} />
        <Route exact path="/admins" element={<SystemUsers />} />
      </Routes>
    </Router>
  );
};

export default App;
