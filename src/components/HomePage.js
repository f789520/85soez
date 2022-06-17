import React from "react";
import { useState, useEffect } from "react";
import { Navigation } from "./navigation";
import { Header } from "./header";
import { Features } from "./features";
import { Contact } from "./contact";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";
import "./app.css"; 

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

function Home() {
  window.scrollTo(0, 0);
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <div>
        <Navigation />
        <Header data={landingPageData.Header} />
        <hr
          style={{
            opacity: "0.1",
            background: "black",
            width: "100%",
            height: "1px",
          }}
        />

        {/* 將FIREBASE資料庫傳到裡面  <Features data={landingPageData.Features }  storepropsdata={props} /> */}
        <Features data={landingPageData.Features} />
        <br />
        <Contact data={landingPageData.Contact} />
      </div>
    </div>
  );
}

export default Home;

// 將FIREBASE資料庫傳到裡面
// const mapStateToProps = (state) => {
//    console.log("mapStateToProps = (state) ",state  )
//   return {
//     mapStateToPropssoez: state
//   };
// };
// export default compose(firestoreConnect("soez"), connect(mapStateToProps))(Home)
