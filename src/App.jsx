// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login-page";
import Register from "./pages/register-page";
import Profile from "./pages/profile-page";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home";
import SearchPage from "./pages/SearchPage";
import RegisterForm from "./pages/Regestration";
import Inbox from "./pages/inbox-phage";

import { useEffect } from "react";
import { useUserStore} from "./components/userStore";
import { auth } from "./components/firebase";
import { onAuthStateChanged } from "firebase/auth";
function App() {
  const {userDetails, fetchUsersInfo} = useUserStore();
  useEffect(() => { 
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUsersInfo(user.uid);
    }); return () => {
      unSub()
    } ;
  }, [fetchUsersInfo]);
  console.log(userDetails)
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
          <Route path="/inbox" element={<Inbox />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
