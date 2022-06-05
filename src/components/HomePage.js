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
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
// import MOCK_DATA from '..data/MOCK_DATA'
// import makeData from '..data/makeData'
 
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
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});



const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin:20px;
`;


const Button = styled.div`
  background-color: ${(props) => (props.active ? "#ffc236" : "#bebebe")};
  border: none;
  border-bottom: 2px solid #3c5d95;
  border-radius: 3px 3px 0 0;
  padding: 5px;
  color: black;
  letter-spacing: 0.1em;
  text-align: center;
  cursor: pointer;
  width:90px;
`;


function ListBtn() {
  return (
    <ButtonContainer>
      <Button>
        <Link to='/list'>Todolist</Link>
      </Button>
    </ButtonContainer>
  );
};

function Home(props) {

  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  //  console.log("Homeprops", props); 
  /* const { mapStateToPropstodosbook } = props
  const firebaseData = useSelector((store) => store.firestoreReducer); */


  return (
    <div>
      <div>
        <Navigation />

        <Header data={landingPageData.Header} />
        <hr style={{ opacity: "0.1", background: "black", width: "100%", height: "1px" }} />

        {/* 將FIREBASE資料庫傳到裡面  <Features data={landingPageData.Features }  storepropsdata={props} /> */}
        <Features data={landingPageData.Features} />
        <br />
        {/* <About data={landingPageData.About} /> */}
        {/* <Services data={landingPageData.Services} /> */}
        {/* <Gallery data={landingPageData.Gallery} /> */}
        {/* <Testimonials data={landingPageData.Testimonials} /> */}
        {/* <Team data={landingPageData.Team} /> */}
        <Contact data={landingPageData.Contact} />
      </div>
      {/* <ListBtn /> */}
    </div>

  );
};


export default Home;

// 將FIREBASE資料庫傳到裡面
// const mapStateToProps = (state) => {
//    console.log("mapStateToProps = (state) ",state  )
//   return {
//     mapStateToPropssoez: state
//   };
// };
// export default compose(firestoreConnect("soez"), connect(mapStateToProps))(Home)

