import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './forms.css'
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from './fire'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from './AuthContext'
import { Navigation } from "./navigation";
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from 'mdb-react-ui-kit';
import { Contact } from "./contact";
import JsonData from "../data/data.json";


function Login() {
  const [landingPageData, setLandingPageData] = useState({});
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setTimeActive } = useAuthValue()
  const navigate = useNavigate()
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.




  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // signInSuccessUrl: 'http://localhost:3000/login',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,

    },
  };


  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);

    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);



  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);



  // const handleLoginFB = () => {
  //   const provider = new FacebookAuthProvider();
  //   const auth = getAuth();
  //   signInWithPopup(auth, provider)
  //     .then(async result => {
  //       const user = result.user;
  //       console.log(user);
  //       console.log(result);
  //       // 在這邊把user資料寫入locaStorage或是進行後端寫入資料庫等等的操作
  //     })
  //     .catch(error => {
  //       console.log(error.message);
  //     });
  // };


  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true)
              navigate('/verify-email')
            })
            .catch(err => alert(err.message))
        } else {
          navigate('/')
        }
      })
      .catch(err => setError(err.message))
  }

  return (
    <div>
      <Navigation />
      <div className='center'>
        <div className='auth'>
          <h1>會員登入</h1>
          {error && <div className='auth__error'>{error}</div>}
          <form onSubmit={login} name='login_form'>
            <input
              type='email'
              value={email}
              required
              placeholder="輸入電子信箱"
              onChange={e => setEmail(e.target.value)} />
            <input
              type='password'
              value={password}
              required
              placeholder='輸入密碼'
              onChange={e => setPassword(e.target.value)} />
            <MDBBtn type='submit'>登入</MDBBtn >
          </form>

          {/* <button onClick={handleLoginFB}>使用facebook登入</button> */}
          <br />
          <p> </p>

          點擊下方 Google 登入<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />

          {/* <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}

          <p>
            還沒有帳號嗎? <span></span>
            <Link to='/register'>點擊這裡 註冊</Link>
          </p>
        </div>
      </div>
      <Contact data={landingPageData.Contact} />
    </div>
  )
}

export default Login