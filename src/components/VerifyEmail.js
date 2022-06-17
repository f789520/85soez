import "./verifyEmail.css";
import { useAuthValue } from "./AuthContext";
import { useState, useEffect } from "react";
import { auth } from "./fire";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const { currentUser } = useAuthValue();
  const [time, setTime] = useState(60);
  const { timeActive, setTimeActive } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser
        ?.reload()
        .then(() => {
          if (currentUser?.emailVerified) {
            clearInterval(interval);
            navigate("/");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }, 1000);
  }, [navigate, currentUser]);

  useEffect(() => {
    let interval = null;
    if (timeActive && time !== 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setTimeActive(false);
      setTime(60);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeActive, time, setTimeActive]);

  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setTimeActive(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="center">
      <div className="verifyEmail">
        <h1>請驗證您的信箱</h1>
        <p>
          <strong>驗證信已經寄送到您的信箱</strong>
          <br />
          <span>{currentUser?.email}</span>
        </p>
        <span>請點擊驗證信中的連結完成會員註冊!!</span>
        <p></p>
        <button onClick={resendEmailVerification} disabled={timeActive}>
          點此重寄一封驗證信 {timeActive && time}
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
