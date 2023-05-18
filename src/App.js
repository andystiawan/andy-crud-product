import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./view/login/Login";
import Register from "./view/register/Register";
import Home from "./view/home/Homes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
