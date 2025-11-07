import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainSignup from "./pages/CaptainSignup";
import Captainlogin from "./pages/Captainlogin";
import Home from "./pages/Home";
import UserProtectectWrapper from "./pages/UserProtectectWrapper";
import CaptainProtectectWrapper from "./pages/CaptainProtectWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
import 'remixicon/fonts/remixicon.css'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/riding" element={<Riding/>} />
        <Route path="/captain-riding" element={<CaptainRiding/>} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<Captainlogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route
          path="/home"
          element={
            <UserProtectectWrapper>
              <Home />
            </UserProtectectWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectectWrapper>
              <UserLogout />
            </UserProtectectWrapper>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectectWrapper>
              <CaptainHome />
            </CaptainProtectectWrapper>
          }
        />
      </Routes>
    </>
  );
};

export default App;
