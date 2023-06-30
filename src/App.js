import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./startscreens/Login";
import Home from "./startscreens/Home";
import Dashboard from "./actionpages/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
