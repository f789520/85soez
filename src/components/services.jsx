import { Navigation } from "./navigation";

import styled from "styled-components";
import { Link } from "react-router-dom";
import React from 'react'
import { useState, useEffect } from "react";

import { Header } from "./header";
import { Features } from "./features";
import { About } from "./about";

import { Gallery } from "./gallery";
import { Testimonials } from "./testimonials";
import { Team } from "./Team";
import { Contact } from "./contact";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";
import "./app.css";



export const Services = (props) => {

  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  return (

    <div>
      <Navigation />
      <div id='services' className='text-center'>
        <div className='container'>
          <div className='section-title'>
            <h2>服務內容</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
              dapibus leonec.
            </p>
          </div>
          <div className='row'>
            {/* {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className='col-md-4'>
                  {' '}
                  <i className={d.icon}></i>
                  <div className='service-desc'>
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))
            : 'loading'} */}
          </div>
        </div>
      </div>
      <Contact data={landingPageData.Contact} />
    </div>
  )
}
