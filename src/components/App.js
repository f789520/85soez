import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Todo from "./ListPage";
import Home from "./HomePage";
import Detail from "./DetailPage";
import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useContext } from 'react'
import { createContext, useState, useEffect } from "react";
import { Navigation } from "./navigation";
import { Header } from "./header";
import { Features } from "./features";
import { About } from "./about";
import { Services } from "./services";
import { Gallery } from "./gallery";
// import { Singin } from "./singin";
import { Testimonials } from "./testimonials";
import { Team } from "./Team";
import { Contact } from "./contact";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";
import "./app.css";
// import Profile from './Profile2'
import Register from './Register'
import VerifyEmail from './VerifyEmail';
import Login from './Login'
import { Profile } from './Profile'
import { AuthProvider } from './AuthContext'
import { auth } from './fire'
import { onAuthStateChanged } from 'firebase/auth'
import PrivateRoute from './PrivateRoute'
import { Navigate } from 'react-router-dom'
// import { AuthContext, LoadingContext } from "./AuthContext";





function App() {
  // const [isLoading, setIsLoading] = useState(false);
  // const { isLoadingGetMe } = useContext(LoadingContext);
  // const [isLoadingGetMe, setLoadingGetMe] = useState(true);
  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)
  const [landingPageData, setLandingPageData] = useState({});
  const [isLoadingGetMe, setLoadingGetMe] = useState(true);

 

 

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);



  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingGetMe(false);
    })


  }, [])
  // console.log("isLoadingGetMe", isLoadingGetMe)
  // console.log("facebook", currentUser.providerData[0].providerId);
  // console.log("currentUser.providerData===facebook.com",currentUser.providerData!=="facebook.com")
  // console.log("!currentUser?.emailVerified", !currentUser?.emailVerified);
  return (
    <Router>
      <AuthProvider value={{landingPageData, setLandingPageData,currentUser, timeActive, setTimeActive,isLoadingGetMe,setLoadingGetMe }}>
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/list" element={<Todo />} />


          <Route path="/about" element={<About data={landingPageData.About} />} />
          <Route path="/services" element={<Services data={landingPageData.Services} />} />
          <Route path="/portfolio" element={<Gallery data={landingPageData.Gallery} />} />
          {/* <Route path="/singin" element={<Singin />} /> */}


          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/detail" element={<Detail />} />

          <Route path="/login" element={

            !currentUser?.emailVerified  //?.可選串連 運算子 如果沒驗證信箱 返回前面
              ? <Login />
              : <Navigate to='/profile' replace />
          } />
          <Route path="/register" element={
            !currentUser?.emailVerified
              ? <Register />
              : <Navigate to='/profile' replace />
          } />
          <Route path='/verify-email' element={<VerifyEmail />} />


          <Route path="*" element={<p>找不到頁面</p>} />
        </Routes>
      </AuthProvider>
    </Router >
  );
}

export default App;


