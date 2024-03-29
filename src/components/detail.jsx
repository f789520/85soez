import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import React, { useMemo, useState, useEffect } from "react";
import soezdata from "../data/soezdata.json";
import "./detail.css";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import db from "../components/fire";
import { useAuthValue } from "./AuthContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

const DetailContainer = styled.div.attrs({ className: "DetailContainer" })`
  margin: 100px auto;
`;

const Styles = styled.div.attrs({ className: "Styles" })`
  padding: 10px 50px;
  width: 100%;
  #table1 {
    text-align: center;
    border-bottom-color: black;
    border: 0;
    border-collapse: collapse;
    border-radius: 8px;
    width: 100%;
    border-color: #000000;
    outline-color: black;
  }
  .title {
    width: 100px;
    background-color: #4c7daf;
    font-weight: 600;
    color: white;
    text-align: center;
  }
  th {
    padding: 16px 8px;
  }
  tbody {
    #contentLandTitletr {
      width: 600px;
    }
  }
  .littletitle {
    font-size: 20px;
    font-weight: 1000;
    color: black;
    color: #0364c6;
  }
  @media (max-width: 760px) {
    #table1 {
      thead {
        display: none;
      }
    }
    #table1 {
      display: block;
      width: 100%;
      tbody {
        display: block;
        width: 100%;
      }
      tr {
        display: block;
        width: 100%;
      }
      td {
        display: block;
        width: 100%;
        text-align: right;
        padding-left: 50%;
        position: relative;
      }
      tbody > tr ::before {
        display: block;
        width: 100%;
        /* text-align: right; */
        padding-left: 15px;
        position: relative;
        font-weight: 1000;
        color: #0364c6;
        font-size: 20px;
      }
      tbody > tr ::before {
        content: attr(data-label);
        text-align: left;
        position: absolute;
        left: 0;
        width: 50%;
      }
    }
    .littletitle {
      font-size: 17px;
    }
  }
`;

const AddressMap = () => {
  return (
    <div className="google-map-code">
      <iframe
        title="googleMap"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14484.190352093989!2d120.9991027!3d24.828046150000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468368f052ac92d%3A0xbf2f1a52cece6599!2z5Lit5ZyL6Yar6Jel5aSn5a245paw56u56ZmE6Kit6Yar6Zmi!5e0!3m2!1szh-TW!2stw!4v1654158935391!5m2!1szh-TW!2stw"
        width="600"
        height="450"
        frameborder="0"
        style={{ border: 0 }}
        allowfullscreen=""
        aria-hidden="false"
        tabindex="0"
      ></iframe>
    </div>
  );
};
export { AddressMap };

export const DetailItem = (props) => {
  window.scrollTo(0, 0); //進來頁面時到頂端
  const { currentUser } = useAuthValue();
  const [searchParams] = useSearchParams();
  const urlids = searchParams.get("ids");
  const data = useMemo(() => soezdata, []);
  const navigate = useNavigate();

  let testdata;
  data.forEach((detaildata) => {
    if (detaildata.ids === urlids) {
      testdata = detaildata;
    }
  });

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
  }, [searchParams]);

  const [checked, setChecked] = useState(false);
  
  function handleFav() {
    if (currentUser === null) {
      console.log("currentUser", currentUser === null);
      navigate("/login");
    } else {
      setChecked(!checked);
      const user = currentUser.uid;
      const ids = testdata.ids;
      if (!checked === true) {
        createFav(user, ids);
        // save ID to localstorage? but this will fail if they come back
      } else {
        console.log("delete me?");
        deleteFav(user, ids);
        // or delete it from firestore
        // delete it where
      }
    }
  }

  function createFav(user, ids) {
    setDoc(doc(db, user, ids), {
      ...testdata,
    })
      .then(handleClickOpenFav())
      .catch(function (error) {
        // console.error("Error adding Tutorial: ", error);
      });
  }

  function deleteFav(user, ids) {
    return deleteDoc(doc(db, user, ids))
      .then(handleClickOpenFavdel())
      .catch(function (error) {
        console.error("Error adding   ", error);
      });
  }

  const [openFav, setOpenFav] = React.useState(false);
  const handleClickOpenFav = () => {
    setOpenFav(true);
  };
  const handleCloseFav = () => {
    setOpenFav(false);
  };

  const [openFavdel, setOpenFavdel] = React.useState(false);
  const handleClickOpenFavdel = () => {
    setOpenFavdel(true);
  };
  const handleCloseFavdel = () => {
    setOpenFavdel(false);
  };
  const src =
    "https://www.google.com/maps?q=" + testdata.address + "&output=embed&z=14";

  return (
    <div className="container">
      <DetailContainer style={{ whiteSpace: "pre-line" }}>
        {/* style={{whiteSpace: "pre-line"}} 保留 html 的空白符號 */}
        <Styles>
          <div>
            <div className="Detailtable">
              <div style={{ display: "grid", gridTemplateColumns: "3fr 50px" }}>
                <div className="littletitle">
                  <div id="ids">
                    &nbsp;&nbsp;物件編號：<span> {testdata.ids} </span>
                  </div>
                  <div id="thisId">
                    {" "}
                    &nbsp; 案號： <span> {testdata.thisId} </span>{" "}
                  </div>
                  {testdata.popular === "" ? null : (
                    <div id="thisId">
                      {" "}
                      &nbsp; 人氣： <span> {testdata.popular} </span>{" "}
                    </div>
                  )}
                </div>
                <Checkbox
                  id="fav"
                  checked={checked ? true : false}
                  onChange={(e) => handleFav()}
                  aria-label="fav"
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  type="checkbox"
                  // style={{ position: "fixed" }}
                />
              </div>
              <table id="table1" className="table">
                <thead>
                  <tr id="title">
                    <th>拍次</th>
                    <th>投標時間</th>
                    <th>開標結果</th>
                    <th>總底價</th>
                    <th>地坪</th>
                    {testdata.caution_money === "" ? null : <th>保證金</th>}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span data-label="拍次：">{testdata.times}</span>
                    </td>
                    <td>
                      <span data-label="投標時間：">
                        {testdata.date_th} －{testdata.time_th}
                      </span>
                    </td>
                    <td>
                      <span data-label="開標結果：">
                        {testdata.result_price}
                      </span>
                    </td>
                    <td>
                      <span data-label="總底價：">
                        {testdata.house_total_lowprice}
                      </span>{" "}
                    </td>
                    <td>
                      <span data-label="地坪：">{testdata.lend_area}</span>
                    </td>
                    {testdata.caution_money === "" ? null : (
                      <td>
                        <span data-label="保證金：">
                          {testdata.caution_money} 萬
                        </span>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
              <br />
              <table id="table2">
                <tbody>
                  <tr>
                    <td className="title">地區</td>
                    <td>
                      <div>{testdata.city}</div>
                    </td>
                  </tr>
                  {testdata.main_building === "" ? null : (
                    <tr>
                      <td className="title">主建物</td>
                      <td>
                        <div>{testdata.main_building}</div>
                      </td>
                    </tr>
                  )}
                  {testdata.building_area === "" ? null : (
                    <tr>
                      <td className="title">建坪</td>
                      <td>
                        <div>{testdata.building_area}</div>
                      </td>
                    </tr>
                  )}
                  {testdata.public_build_ratio === "" ? null : (
                    <tr>
                      <td className="title">公設比</td>
                      <td>
                        <div>{testdata.public_build_ratio}</div>
                      </td>
                    </tr>
                  )}
                  {testdata.house_per_price === "" ? null : (
                    <tr>
                      <td className="title">房屋單價</td>
                      <td>
                        <div>{testdata.house_per_price}</div>
                      </td>
                    </tr>
                  )}
                  {testdata.house_years === "" ? null : (
                    <tr>
                      <td className="title">屋齡</td>
                      <td>
                        <div>{testdata.house_years}</div>
                      </td>
                    </tr>
                  )}
                  {testdata.open_price === "" ? null : (
                    <tr>
                      <td className="title">公告現值</td>
                      <td>
                        <div>{testdata.open_price} 元/㎡</div>
                      </td>
                    </tr>
                  )}
                  {testdata.address === "" ? null : (
                    <tr>
                      <td className="title" id="addressTitle">
                        地址
                      </td>
                      <td>
                        <div>{testdata.address}</div>
                      </td>
                    </tr>
                  )}
                  {testdata.contentLand === "" ? null : (
                    <tr>
                      <td className="title" id="contentLandTitle">
                        土地
                      </td>
                      <td id="contentLandTitletr">
                        <div id="contentLand" style={{ lineHeight: "32px" }}>
                          {testdata.contentLand}
                        </div>
                      </td>
                    </tr>
                  )}
                  {testdata.contentRecord === "" ? null : (
                    <tr>
                      <td className="title" id="contentRecordTitle">
                        查封筆錄
                      </td>
                      <td>
                        <div id="contentRecord" style={{ lineHeight: "32px" }}>
                          {testdata.contentRecord}
                        </div>
                      </td>
                    </tr>
                  )}
                  {testdata.record === "" ? null : (
                    <tr>
                      <td className="title" id="recordTitle">
                        拍賣紀錄
                      </td>
                      <td>
                        <div id="record" style={{ lineHeight: "32px" }}>
                          {testdata.record}
                        </div>
                      </td>
                    </tr>
                  )}
                  {testdata.increase === "" ? null : (
                    <tr>
                      <td className="title" id="otherTitle">
                        其他資訊
                      </td>
                      <td>
                        <div id="other" style={{ lineHeight: "32px" }}>
                          {testdata.increase}
                        </div>
                      </td>
                    </tr>
                  )}
                  {testdata.winner === "" ? null : (
                    <tr>
                      <td className="title">得標人查詢</td>
                      <td>
                        <div id="other">{testdata.winner}</div>
                      </td>
                    </tr>
                  )}
                  {/* {testdata.img_list.length === 0 ? null : (
                    <tr>
                      <td className="title">照片</td>
                      <td>
                        <div id="other">{testdata.img_list}</div>
                      </td>
                    </tr>
                  )} */}
                </tbody>
              </table>
              <Dialog
                open={openFav}
                onClose={handleCloseFav}
                aria-labelledby="alert-dialog-title-Fav"
              >
                <DialogTitle
                  style={{ fontSize: "20px" }}
                  id="alert-dialog-title-Fav"
                >
                  {"新增到我的收藏成功!!"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleCloseFav} style={{ fontSize: "20px" }}>
                    確認
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={openFavdel}
                onClose={handleCloseFavdel}
                aria-labelledby="alert-dialog-title-Favdel"
              >
                <DialogTitle
                  style={{ fontSize: "20px" }}
                  id="alert-dialog-title-Favdel"
                >
                  {"從我的收藏取消成功!!"}
                </DialogTitle>
                <DialogActions>
                  <Button
                    style={{ fontSize: "20px" }}
                    onClick={handleCloseFavdel}
                  >
                    確認
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <div className="MapContainer">
              <p
                className="google-map-text"
                style={{ fontSize: "20px", color: "black" }}
              >
                物件地址：{testdata.address}
              </p>

              <div className="google-map-code">
                <iframe
                  title="google-map"
                  src={src}
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
            </div>
          </div>
        </Styles>
      </DetailContainer>
    </div>
  );
};
