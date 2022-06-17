import { Navigation } from "./navigation";
import React from "react";
import { useState, useEffect } from "react";
import { Contact } from "./contact";
import JsonData from "../data/data.json";
import "./app.css";
import { fontSize } from "@mui/system";
import styled from "styled-components";

const Videobox = styled.div.attrs({ className: "Videobox" })`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const Services = (props) => {
  window.scrollTo(0, 0);
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  return (
    <div>
      <Navigation />
      <div id="services" className="text-center">
        <div
          className="container"
          style={{ whiteSpace: "pre-line", fontSize: "20px" }}
        >
          <div className="section-title">
            <h2>服務內容</h2>
            <p style={{ fontSize: "20px" }}>
              法拍屋標購前中後，不管遇到各式各樣的法律問題，都會由我們專業法律團隊幫您把關!
            </p>
            <br />
          </div>
          <div className="row">
            {props.data
              ? props.data.map((d, i) => (
                  <div key={`${d.name}-${i}`} className="col-md-4">
                    {" "}
                    <i className={d.icon}></i>
                    <div className="service-desc">
                      <h3>{d.name}</h3>
                      <p style={{ fontSize: "20px",textAlign:"left" }}>{d.text}</p>
                    </div>
                  </div>
                ))
              : "loading"}
          </div>
        </div>
      </div>
      <div id="services" className="text-center">
        <div className="container">
          <div className="section-title">
            <hr
              style={{
                opacity: "0.1",
                background: "black",
                width: "100%",
                height: "1px",
              }}
            />
            <Videobox>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/o57-o9Wg22Q"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Videobox>
            <p style={{ fontWeight: "bold" }}>點擊觀看影片:</p>

            <div style={{ fontSize: "20px", lineHeight: "38px" ,textAlign:"left"}}>
              <a href="https://youtu.be/o57-o9Wg22Q">
                {" "}
                ．ＭＯＭＯＴＶ－今日大小事
              </a>
              <br />
              <a href="https://www.youtube.com/watch?v=o57-o9Wg22Q">
                {" "}
                ．掌握這三招 5折買到房！20201001 Sway 【今天大小事】完整版
              </a>
              <br />
              <a href="https://youtu.be/6CQ_xjVP5sc">
                {" "}
                ．【幸福空間直播】法拍屋投標流程與購屋技巧，法拍小哥來教你如何聰明買到超值便宜好房子！
              </a>
              <br />
              <a href="https://youtu.be/7fy9FsishgY">
                {" "}
                ．【幸福空間直播】法拍小哥，教你買便宜！如何判斷房價趨勢！
              </a>
            
              <br />
              <a href="https://www.youtube.com/watch?v=6CQ_xjVP5sc">
                {" "}
                ．【幸福空間直播】，法拍小哥來教你如何聰明買到超值便宜好房子！
              </a>
              <br />
              <a href="https://www.youtube.com/watch?v=7fy9FsishgY">
                {" "}
                ．【新手投資購屋三部曲ｘ
                法拍屋入門必看ｘ如何判斷房價趨勢！】【幸福空間直播】法拍小哥，教你買便宜！
              </a>
              <br />
            </div>
          </div>
          <div className="row">
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
  );
};
