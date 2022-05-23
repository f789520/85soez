import { Image } from "./image";
import { Navigation } from "./navigation";
import styled from "styled-components";
import { Link } from "react-router-dom";
import React from 'react'
import { useState, useEffect } from "react";

import { Header } from "./header";
import { Features } from "./features";
import { About } from "./about";

import { Testimonials } from "./testimonials";
import { Team } from "./Team";
import { Contact } from "./contact";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";
import "./app.css";


export const Gallery = (props) => {

  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);


  return (

    <div>
      <Navigation />
      <div id='portfolio' className='text-center'>
        <div className='container'>
          <div className='section-title'>
            <h2>案例</h2>
            <p>
            案例分享
            </p>
          </div>
          <div className='row'>
            <div className='portfolio-items'>
              {console.log("Gallerypropsdata", props.data)}
              {props.data
                ? props.data.map((d, i) => (
                  <div key={`${d.title}-${i}`} className='col-sm-6 col-md-4 col-lg-4'>
                    <Image title={d.title} largeImage={d.largeImage} smallImage={d.smallImage} />
                  </div>
                ))
                : 'Loading...'}
            </div>
          </div>
        </div>
      </div>
      <Contact data={landingPageData.Contact} />
    </div>
  )
}
