import './app.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Profile from './Profile'
import Register from './Register'
import VerifyEmail from './VerifyEmail';
import Login from './Login'
import { useRef, useState, useEffect } from 'react'
// import { AuthProvider } from './AuthContext'
import { auth } from './fire'
import { onAuthStateChanged } from 'firebase/auth'
import PrivateRoute from './PrivateRoute'
import { Navigate } from 'react-router-dom'
import React, { useContext } from "react";
import { signup, login, logout, useAuth } from "./fire"; 
import { useAuthValue } from './App'
import { signOut } from 'firebase/auth' 
import { AuthContext, LoadingContext } from "./AuthContext"; 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Loading from "./Loading";



export const Navigation = (props) => {
  // const { currentUser } = useAuthValue()
  const { isLoadingGetMe } = useContext(LoadingContext);
  const [currentUser, setCurrentUser] = useState(null)
  // const [timeActive, setTimeActive] = useState(false)
  // const { isLoading, setIsLoading } = useContext(LoadingContext);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])


  // const currentUser = useAuth();



  return (
    <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          <a className='navbar-brand page-scroll' href='/'>
            85 SOEZ
          </a>{' '}
        </div>
       
        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a href='/' className='page-scroll' style={{}}>
                首頁/物件查詢
              </a>
            </li>
            <li>
              <a href='/about' className='page-scroll'>
                關於我們
              </a>
            </li>
            <li>
              <a href='/services' className='page-scroll'>
                代標服務
              </a>
            </li>
            <li>
              <a href='/portfolio' className='page-scroll'>
                案例
              </a>
            </li>
            <li>
              <a href='#contact' className='page-scroll'>
                聯絡我們
              </a>
            </li>


            {isLoadingGetMe ? (
              <Loading/>
            ) : (
              <>
                {currentUser &&
                  <>
                    <li>

                      <a href='/profile' className='page-scroll'>
                        會員中心
                      </a>

                    </li>

                    <li>
                      <a href='/profile' className='page-scroll'>
                        <span onClick={() => signOut(auth)}>登出</span>
                      </a>

                    </li>
                  </>
                }

                {!currentUser &&

                  <>
                    <li>
                      <a href='/login' className='page-scroll'>
                        登入
                      </a>

                    </li>

                  </>
                }

              </>)}
            {/* <li>
              <a href='#testimonials' className='page-scroll'>
                客戶回饋?
              </a>
            </li> */}
            {/* <li>
              <a href='#team' className='page-scroll'>
                團隊介紹
              </a>
            </li> */}

          </ul>


        </div>
      </div>
    </nav>
  )
}
