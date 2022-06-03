import styled from "styled-components";
import { GlobalFilter } from './GlobalFilter'
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import React, { useMemo } from 'react'
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table'
// import MOCK_DATA from '..data/MOCK_DATA'
// import makeData from '..data/makeData'
import soezdata from '../data/soezdata.json'
import { COLUMNS } from './columns'
import { STORECOLUMNS } from './storecolumns'
import { createStore } from "redux"
import { async } from "@firebase/util";
import { GoogleMap, useJsApiLoader, useLoadScript, Marker } from '@react-google-maps/api';
import './detail.css'
import {

  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import db from '../components/fire'
import {
  GoogleAuthProvider,
  FacebookAuthProvider, getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile
} from "firebase/auth";
import { useAuthValue } from './AuthContext'



const DetailContainer = styled.div.attrs({ className: 'DetailContainer' })`


/* width: 100%; */
/* margin-top:100px; */
margin:100px auto;
`


const MapContainer = styled.div.attrs({ className: 'MapContainer' })`


 flex-direction: column;
margin:10px auto;
display: flex;

.google-map-text{
  margin:10px auto;

}
.google-map-code{
  margin:10px auto;
  position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 75%;
  
}


.google-map-code iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
`

const Styles = styled.div.attrs({ className: 'Styles' })` 

padding: 10px 50px;
/* margin: 10px 50px; */
width:100%;


/* max-width:1200px; */
#table1 {
  text-align:center;
  /* border-spacing: 0;
  border: 1px solid black; */
  border-bottom-color:black;
  border: 0;
  border-collapse: collapse;
  border-radius: 8px;
  width: 100%;
  border-color: #000000;
  outline-color:black;
   
}
.title{
  width:100px;
  background-color:#4c7daf;
  font-weight:600;
  color:white;
  text-align:center;

}
th{ 
  padding: 16px 8px;
}

tbody{
  #contentLandTitletr{  width: 600px;
  }
}
 
 
 

 
.littletitle{
  font-size : 20px;
  font-weight: 1000;
  color:black;
  color: #0364c6;
  }
 
  @media (max-width: 760px) { 
    #table1{ 
      thead{
 
        display: none;
      } 
      }

   
/* 
.table ,.table >tbody ,.table >tr ,.table >td{
display: block;
width:10

0%;
} */
#table1{
  display: block;
width:100%;
tbody{

  display: block;
width:100%;

}

tr{
  display: block;
width:100%;
}

td{ 
  display: block;
width:100%;
text-align: right;
padding-left: 50%;
position: relative;
}

tbody >tr  ::before{ 
  display: block;
width:100%;
/* text-align: right; */
padding-left: 15px;
position: relative;
font-weight:1000;
color: #0364c6;
font-size:20px;

}
tbody >tr  ::before{
      content: attr(data-label);
      text-align: left;
      position: absolute;
      left: 0;
      width:50%;
    }
} 
.littletitle{
  font-size : 17px; 
  } 
}`
const AddressMap = () => {
  return (
    <div className="google-map-code">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14484.190352093989!2d120.9991027!3d24.828046150000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468368f052ac92d%3A0xbf2f1a52cece6599!2z5Lit5ZyL6Yar6Jel5aSn5a245paw56u56ZmE6Kit6Yar6Zmi!5e0!3m2!1szh-TW!2stw!4v1654158935391!5m2!1szh-TW!2stw" width="600" height="450" frameborder="0" style={{ border: 0 }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
    </div>
  );
}
export { AddressMap }


export const DetailItem = (props) => {
  // console.log("propssearchParams", props)//從DetailPage 傳過來的
  const { currentUser } = useAuthValue()
  const [searchParams] = useSearchParams();
  // console.log("DetailItemsearchParams", searchParams.get('ids')); // ▶ URLSearchParams {}
  const urlids = searchParams.get('ids');
  // console.log("urlids", urlids);

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    // console.log(currentParams); // get new values onchange 
  }, [searchParams]);

  const data = useMemo(() => soezdata, [])
  // console.log("DetailItemsoezdata", data)





  let testdata
  data.forEach((detaildata) => {

    // console.log("data.forEach()", detaildata.ids)

    if (detaildata.ids === urlids) {
      // console.log("data.forEach(detaildata)", detaildata)
      testdata = detaildata

    }
  })

  // console.log("testdata", testdata)




  const [checked, setChecked] = useState(false);

  function handleFav(e) {

    setChecked(!checked);
    const user = currentUser.uid;
    // setFav(!fav)
    console.log('1111111111111111111111111111111111111111111111111', !checked)
    console.log('user', user)
    console.log('testdata', testdata)
    const ids = testdata.ids
    console.log('ids', ids)
    if (!checked === true) {
      // save it to firestore
      console.log('auth.user.id', user)
      createFav(user, ids)
      // save ID to localstorage? but this will fail if they come back

    } else {
      console.log('delete me?')
      // console.log(auth.user.id)
      deleteFav(user, ids)
      // or delete it from firestore
      // delete it where 
    }

  }

  function createFav(user, ids) {
    console.log('user', user)
    console.log('createFavids', ids)
    console.log('testdata', testdata)
    // return addDoc(collection(db, "favs", user), {

    //   timestamp: serverTimestamp(),
    //   testdata
    //   // website: url
    // }


    setDoc(doc(db, user, ids), {

      ...testdata,

      // website: url
    }

    ).then(alert("新增成功"), console.log("新增成功"))
      .catch(function (error) {
        console.error("Error adding Tutorial: ", error);
      });;
  }

  function deleteFav(user, ids) {
    // var dt = firestore.collection('favs').where('website','==',website).where('user','==',user);
    return deleteDoc(doc(db, user, ids)
    ).then(
      alert("刪除成功"), console.log("刪除成功 ")
    )
      .catch(function (error) {
        console.error("Error adding Tutorial: ", error);
      });;

  }


  const src = "https://www.google.com/maps?q=" + testdata.address + "&output=embed&z=14"
  return (

    <DetailContainer>
      <Styles >
        <div>

          <div className="Detailtable">
            <div className="littletitle">
              <Checkbox checked={checked ? true : false} onChange={(e) => handleFav()} aria-label="fav" icon={<FavoriteBorder />} checkedIcon={<Favorite />} type='checkbox' />
              <div id="ids">&nbsp;&nbsp;物件編號 ： <span  > {testdata.ids} </span></div>
              <div id="thisId">  &nbsp;  案號 ：    <span > {testdata.thisId} </span> </div>
              <div id="thisId">  &nbsp;  人氣 ：    <span > {testdata.popular} </span> </div>
            </div>
            <table id="table1" className="table">
              <thead>
                <tr id="title">
                  <th>拍次</th>
                  <th>投標時間</th>
                  <th>開標結果</th>
                  <th>總底價</th>
                  <th>地坪</th>
                  <th>保證金</th>
                  {/* <th></th> */}
                </tr>
              </thead>

              <tbody>
                <tr >
                  <td><span data-label="拍次：">{testdata.times}</span></td>
                  <td><span data-label="投標時間：">{testdata.date_th} <br />{testdata.time_th}</span></td>
                  <td><span data-label="開標結果：">{testdata.result_price}</span></td>
                  <td><span data-label="總底價：">{testdata.house_total_lowprice}</span> </td>
                  <td><span data-label="地坪：">{testdata.lend_area}</span></td>
                  <td><span data-label="保證金：">{testdata.caution_money} 萬</span></td>

                  {/* &nbsp; */}
                </tr>

              </tbody>
            </table>
            <br />
            <table id="table2" >
              <tbody>
                <tr>
                  <td className="title">地區</td>
                  <td  ><div  >{testdata.city}</div></td>
                </tr>
                <tr>
                  <td className="title">主建物</td>
                  <td  ><div  >{testdata.main_building}</div></td>
                </tr>
                <tr>
                  <td className="title">建坪</td>
                  <td  ><div  >{testdata.building_area}</div></td>
                </tr>
                <tr>
                  <td className="title">公設比</td>
                  <td  ><div  >{testdata.public_build_ratio}</div></td>
                </tr>
                <tr>
                  <td className="title">房屋單價</td>
                  <td  ><div  >{testdata.house_per_price}</div></td>
                </tr>
                <tr>
                  <td className="title">屋齡</td>
                  <td  ><div  >{testdata.house_years}</div></td>
                </tr>
                <tr>
                  <td className="title">公告現值</td>
                  <td  ><div  >{testdata.open_price} 元/㎡</div></td>
                </tr>
                <tr>
                  <td className="title" id="addressTitle">地址</td>
                  <td  ><div  >{testdata.address}</div></td>
                </tr>
                <tr>
                  <td className="title" id="contentLandTitle">土地</td>
                  <td id="contentLandTitletr"><div id="contentLand">{testdata.contentLand}</div></td>
                </tr>
                <tr>
                  <td className="title" id="contentRecordTitle">查封筆錄</td>
                  <td><div id="contentRecord">{testdata.contentRecord}</div></td>
                </tr>
                <tr>
                  <td className="title" id="recordTitle">拍賣紀錄</td>
                  <td><div id="record">{testdata.record}</div></td>
                </tr>
                <tr>
                  <td className="title" id="otherTitle">其他資訊</td>
                  <td><div id="other">{testdata.increase}</div></td>
                </tr>
                <tr>
                  <td className="title"  >得標人查詢</td>
                  <td><div id="other">{testdata.winner}</div></td>
                </tr>
                <tr>
                  <td className="title"  >土地漲價總額</td>
                  <td><div id="other">{testdata.increase2}</div></td>
                </tr>
                <tr>
                  <td className="title"  >照片</td>
                  <td><div id="other">{testdata.img_list}</div></td>
                </tr>


              </tbody>
            </table>
          </div>
        </div>

        <MapContainer>
          <p className="google-map-text" >{testdata.address}</p>
          <div className="google-map-code">
            <iframe title="google-map" src={src} frameBorder="0" style={{ border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
          </div>

        </MapContainer>


      </Styles>

      {/* <header id='header'>
        <form className='intro'>
          <div className='overlay'>
            <div className='container'>
              <div className='row'>


                <div className='col-md-8 col-md-offset-2 intro-text'>

                  <h1>

                    <span></span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </form>
      </header> */}

    </DetailContainer >
  )
}
