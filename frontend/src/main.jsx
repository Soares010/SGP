import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/assets/styles/index.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login/index";
import Project from "./Pages/Projects";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </Router>
  </StrictMode>
);
