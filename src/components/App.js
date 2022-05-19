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
import React from 'react'
import { useState, useEffect } from "react";
import { Navigation } from "./navigation";
import { Header } from "./header";
import { Features } from "./features";
import { About } from "./about";
import { Services } from "./services";
import { Gallery } from "./gallery";
import { Testimonials } from "./testimonials";
import { Team } from "./Team";
import { Contact } from "./contact";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";
import "./app.css"; 

function App() {

  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        {/* <Route path="/list" element={<Todo />} /> */}
        <Route path="/about" element={<About data={landingPageData.About}/>} />
        <Route path="/services" element={<Services data={landingPageData.Services} />} />
        <Route path="/portfolio" element={<Gallery data={landingPageData.Gallery} />} />
        
        
        
        <Route path="*" element={<p>找不到頁面</p>} />
      </Routes>
    </Router>
  );
}

export default App;


