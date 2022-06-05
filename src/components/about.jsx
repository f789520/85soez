import { Navigation } from "./navigation";
import React, { useState, useEffect } from "react";
import { Team } from "./Team";
import { Contact } from "./contact";
import JsonData from "../data/data.json";
import "./app.css";

export const About = (props) => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  return (
    <div>
      <Navigation />
      <div id="about">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              {" "}
              <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
            </div>
            <div className="col-xs-12 col-md-6">
              <div className="about-text">
                <h2>關於我們</h2>
                <p style={{ fontSize: "30px", lineHeight: "38px" }}>
                  {props.data ? props.data.paragraph : "loading..."}
                </p>
                <h3>為何選擇我們?</h3>
                <div className="list-style">
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <ul style={{ fontSize: "20px" }}>
                      {props.data
                        ? props.data.Why.map((d, i) => (
                            <li key={`${d}-${i}`}>{d}</li>
                          ))
                        : "loading"}
                    </ul>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <ul style={{ fontSize: "20px" }}>
                      {props.data
                        ? props.data.Why2.map((d, i) => (
                            <li key={`${d}-${i}`}> {d}</li>
                          ))
                        : "loading"}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
};
