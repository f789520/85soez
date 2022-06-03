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
import { DetailItem } from "./detail";
import { Contact } from "./contact";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";
import "./app.css";
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
// import MOCK_DATA from '..data/MOCK_DATA'
// import makeData from '..data/makeData'
import { COLUMNS } from './columns'
import './table.css'
import axios from 'axios';
import { useSelector } from "react-redux";
import { useFirestoreConnect } from 'react-redux-firebase'
import Filter from "./Filter";
import TaskItem from "./TaskItem";
import { connect } from 'react-redux'
import db from './fire'

import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { useSearchParams } from 'react-router-dom';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

 

function Detail() {
  const tasks = useSelector((store) => store);
  // console.log("Detailtasks", tasks)

  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);


  const [searchParams] = useSearchParams();
  // console.log("searchParams", searchParams.get('ids')); // ▶ URLSearchParams {}

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
        {/* <Header data={landingPageData.Header} />
        <Features data={landingPageData.Features }/> 
        <About data={landingPageData.About} />
        <Services data={landingPageData.Services} />
        <Gallery data={landingPageData.Gallery} />
        <Team data={landingPageData.Team} /> */}
        {/* <About data={landingPageData.About} /> */}
        <br />
        <br />
        <Contact data={landingPageData.Contact} />
      </div>

    </div>

  );
};


export default Detail;

// 將FIREBASE資料庫傳到裡面
// const mapStateToProps = (state) => {
//   /* console.log("mapStateToProps = (state) ",state  ) */
//   return {
//     mapStateToPropssoez: state.firestoreReducer.ordered
//   };
// };
// export default compose(firestoreConnect(['soez']), connect(mapStateToProps))(Home)

