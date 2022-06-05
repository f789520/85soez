import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate, 
} from "react-router-dom"; 
import Home from "./HomePage";
import Detail from "./DetailPage";
import React, { useState, useEffect } from "react";
import { About } from "./about";
import { Services } from "./services";
import { Gallery } from "./gallery";
import JsonData from "../data/data.json";
import "./app.css";
import Register from "./Register";
import VerifyEmail from "./VerifyEmail";
import Login from "./Login";
import { Profile } from "./Profile";
import { AuthProvider } from "./AuthContext";
import { auth } from "./fire";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoute from "./PrivateRoute";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);
  const [landingPageData, setLandingPageData] = useState({});
  const [isLoadingGetMe, setLoadingGetMe] = useState(true);

  useEffect(() => {
    setLandingPageData(JsonData);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingGetMe(false);
    });
  }, []);

  return (
    <Router>
      <AuthProvider
        value={{
          landingPageData,
          setLandingPageData,
          currentUser,
          timeActive,
          setTimeActive,
          isLoadingGetMe,
          setLoadingGetMe,
        }}
      >
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/about"
            element={<About data={landingPageData.About} />}
          />
          <Route
            path="/services"
            element={<Services data={landingPageData.Services} />}
          />
          <Route
            path="/portfolio"
            element={<Gallery data={landingPageData.Gallery} />}
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/detail" element={<Detail />} />
          <Route
            path="/login"
            element={
              !currentUser?.emailVerified ? ( //?.可選串連 運算子 如果沒驗證信箱 返回前面
                <Login />
              ) : (
                <Navigate to="/profile" replace />
              )
            }
          />
          <Route
            path="/register"
            element={
              !currentUser?.emailVerified ? (
                <Register />
              ) : (
                <Navigate to="/profile" replace />
              )
            }
          />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="*" element={<p>找不到頁面</p>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
