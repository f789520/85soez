import "./app.css";
import React, { useState, useEffect, useContext } from "react";
import { auth } from "./fire";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { LoadingContext } from "./AuthContext";
import Loading from "./Loading";
import { Link } from "react-router-dom"; 

export const Navigation = () => {
  const { isLoadingGetMe } = useContext(LoadingContext);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <Link  to='/' className="navbar-brand page-scroll" >85 SOEZ</Link>
 
        </div>
        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
            <Link  to='/' className="page-scroll">首頁/物件查詢</Link>
              
            </li>
            <li>
              <Link to="/about" className="page-scroll">
                關於我們
              </Link>
            </li>
            <li>
              <Link to="/services" className="page-scroll">
                代標服務
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="page-scroll">
                案例
              </Link>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                聯絡我們
              </a>
            </li>
            {isLoadingGetMe ? (
              <Loading />
            ) : (
              <>
                {currentUser && (
                  <>
                    <li>
                      <Link to="/profile" className="page-scroll">
                        會員中心
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile" className="page-scroll">
                        <span onClick={() => signOut(auth)}>登出</span>
                      </Link>
                    </li>
                  </>
                )}
                {!currentUser && (
                  <>
                    <li>
                      <Link to="/login" className="page-scroll">
                        登入
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
