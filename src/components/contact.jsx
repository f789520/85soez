import { useState } from "react";
import emailjs from "emailjs-com";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });
  const handleSubmit = (e) => {
    e.preventDefault(); 
    emailjs
      .sendForm("Gmail", "template_aqfeq8q", e.target, "lL7DcRFa3Dv1bXumS")
      .then(
        (result) => {
          // console.log(result.text);
          clearState();
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>聯絡我們</h2>
                <p>有任何問題，請聯絡我們，會盡快為您服務</p>
              </div>
              <form name="sentMessage" validate="true" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="請輸入名字"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="請輸入電子信箱"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="任何問題請輸入此欄..."
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  送出問題
                </button>
              </form>
            </div>
          </div>
          <hr
            style={{
              opacity: "0.1",
              background: "black",
              width: "100%",
              height: "1px",
            }}
          />
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>聯絡資訊</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> 地址
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> 電話
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> 信箱
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : "/"}>
                      <i className="fa fa-facebook-official"></i>
                      <p style={{ color: "white" }}>粉絲專頁</p>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.facebook : "/"}>
                      <i className="fa fa-facebook"></i>
                      <p style={{ color: "white" }}>法拍小哥</p>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.line : "/"}>
                      <i className="fa">Line</i>
                      <p style={{ color: "white" }}>加入好友</p>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.youtube : "/"}>
                      <i className="fa fa-youtube fa-5x"></i>
                      <p style={{ color: "white" }}>Youtube</p>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.instagram : "/"}>
                      <i className="fa fa-instagram"></i>
                      <p style={{ color: "white" }}>Instagram</p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2022 Copyright 85 SOEZ 法拍網. All Rights Reserved. Design by{" "}
            Jay
          </p>
        </div>
      </div>
    </div>
  );
};
