import React from "react";
import { useState, useEffect } from "react";
import { Navigation } from "./navigation"; 
import { DetailItem } from "./detail";
import { Contact } from "./contact";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";
import "./app.css";  
import { useSelector } from "react-redux"; 
import { useSearchParams } from "react-router-dom";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

function Detail() {
  const tasks = useSelector((store) => store);  
  const [landingPageData, setLandingPageData] = useState({});
  const [searchParams] = useSearchParams(); 

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []); 

  return (
    <div>
      <div>
        <Navigation />
        <br />
        <br />
        <br />
        <DetailItem searchParams={searchParams} />
        <br />
        <br />
        <br />
        <br /> 
        <br />
        <br />
        <Contact data={landingPageData.Contact} />
      </div>
    </div>
  );
}

export default Detail; 
