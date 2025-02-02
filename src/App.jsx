import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login-page";
import Register from "./components/register-page";
import Profile from "./components/profile-page";
import { ToastContainer } from "react-toastify";
import Home from "./components/home";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
