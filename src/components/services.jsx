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
            <p style={{fontSize:"20px" ,lineHeight:"38px"}}>
              法拍屋標購前中後，<br />會遇到各式各樣的法律問題，<br />
              法院的投標規則、<br />４種點交處理、<br />３５種不點交的處理、<br />產權剖析、產權安全過戶....<br />都會由我們專業法律團隊幫您把關
            </p>
            <br />
            <p style={{fontWeight:"bold"}}>點擊觀看影片:</p>
         
            <div style={{fontSize:"20px" ,lineHeight:"38px"}}>
            <a href="https://youtu.be/o57-o9Wg22Q"> ．ＭＯＭＯＴＶ－今日大小事</a><br />
            <a href="https://youtu.be/6CQ_xjVP5sc"> ．【幸福空間直播】法拍屋投標流程與購屋技巧，法拍小哥來教你如何聰明買到超值便宜好房子！</a><br />
            <a href="https://youtu.be/7fy9FsishgY"> ．【幸福空間直播】法拍小哥，教你買便宜！如何判斷房價趨勢！</a><br />
            <a href="https://www.youtube.com/watch?v=o57-o9Wg22Q"> ．掌握這三招 5折買到房！20201001 Sway 【今天大小事】完整版</a><br />
            <a href="https://www.youtube.com/watch?v=6CQ_xjVP5sc"> ．【免百萬入手超值透天厝？ｘ 法拍屋入門必看ｘ 法拍屋投標流程與購屋技巧】【幸福空間直播】，法拍小哥來教你如何聰明買到超值便宜好房子！</a><br />
            <a href="https://www.youtube.com/watch?v=7fy9FsishgY"> ．【新手投資購屋三部曲ｘ 法拍屋入門必看ｘ如何判斷房價趨勢！】【幸福空間直播】法拍小哥，教你買便宜！</a><br />
            
            </div>
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
    </div >
  )
}
