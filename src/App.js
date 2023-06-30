import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./startscreens/Login";
import Home from "./startscreens/Home";
import Dashboard from "./actionpages/Dashboard";
import Map from "./actionpages/Map";
import Claims from "./actionpages/Claims";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/map" element={<Map />} />
        <Route exact path="/claims" element={<Claims />} />
      </Routes>
    </Router>
  );
};

export default App;
