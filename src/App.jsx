import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login-page";
import Register from "./components/register-page";
import Profile from "./components/profile-page";
import { ToastContainer } from "react-toastify";
import Home from "./components/home";
import SearchPage from "./components/SearchPage";
import RegisterForm from "./components/Regestration";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Search" element={<SearchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/RegisterForm" element={<RegisterForm />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/chat/:chatId" element={<Chat />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
