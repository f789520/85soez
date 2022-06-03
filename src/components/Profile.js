import './profile.css'
import './react-editext.css'
import { useAuthValue } from './AuthContext'
import { signOut, deleteUser } from 'firebase/auth'
import { auth, storage } from './fire'
import { Navigation } from "./navigation";
import { useEffect, useState } from "react";
// import { upload } from "./fire";
import styled from "styled-components";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  GoogleAuthProvider,
  FacebookAuthProvider, getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile
} from "firebase/auth";
import { Contact } from "./contact";
import JsonData from "../data/data.json";
import { EditText, EditTextarea } from 'react-edit-text'
import EdiText from "react-editext";
import './table.css'
import { STORECOLUMNS,PROFILE_COLUMNS } from './storecolumns'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
import soezdata from '../data/soezdata.json'
import { COLUMNS } from './columns'
import React, { useMemo } from 'react'
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce, usePagination, useRowSelect } from 'react-table'
import { Checkboxs } from './Checkbox'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect,useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import db from './fire'


const Styles = styled.div`

@media (max-width: 360px) { 
 th:nth-of-type(1),  th:nth-of-type(4),  th:nth-of-type(7),  td:nth-of-type(1), td:nth-of-type(4),  td:nth-of-type(7) ,    th:nth-of-type(6) ,   td:nth-of-type(6),   th:nth-of-type(2), td:nth-of-type(2){
display: none;
font-size: 10px;
}
th:nth-of-type(3), td:nth-of-type(3), th:nth-of-type(5), td:nth-of-type(5){
font-size: 20px;
}
}

@media (min-width: 570px)and (max-width: 1200px) { 
th:nth-of-type(4), th:nth-of-type(7),   td:nth-of-type(4), td:nth-of-type(7) ,  th:nth-of-type(2), td:nth-of-type(2){
display: none;
} 
.featuretable  { 
font-size: 20px;
}
}

@media (min-width: 360px)and (max-width: 570px) { 
th:nth-of-type(4), th:nth-of-type(7),   td:nth-of-type(4), td:nth-of-type(7) ,  th:nth-of-type(2), td:nth-of-type(2), th:nth-of-type(1), td:nth-of-type(1){
display: none;
}
.featuretable {
 font-size: 20px;
 }
}`

const Avatar = styled.img.attrs({ className: 'Avatar' })`
vertical-align: middle;
  width: 120px;
  height: 120px;
  border-radius: 10%;
  border-width: 2px;
  border-color: gray;
  border-style: outset;
`;



export const Profile=(props)=> {
  console.log("props",props);
  const [editing, setEditing] = useState(false);

  useFirestoreConnect([
    { collection: 'soez' } // or 'todos'
  ])
  const soez = useSelector((state) => state.firestore )
  console.log("soez",soez);



  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  const auth = getAuth();
  const user = auth.currentUser;

  const { currentUser } = useAuthValue()
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");


  const [displayName, setDisplayName] = useState(currentUser?.displayName);

  const handleSave = (displayName) => {
    console.log(displayName);
    setDisplayName(displayName);
    triggerUpdateUser(displayName)
  };

  // 刪除帳號


  function triggerChangeUserPassword() {

    sendPasswordResetEmail(auth, auth.currentUser.email).then(function () {
      // Email sent.

      console.log("更改密碼Email已發送");
      alert('更改密碼Email已發送，請至信箱查看!!');

    }, function (error) {
      // An error happened.

      console.error("更改密碼", error);
      alert('更改密碼Email發送失敗');
    });



  }
  function triggerUpdateUser(displayName) {
    updateProfile(auth.currentUser, {
      displayName: displayName
    }).then(() => {
      alert('更改會員姓名成功!!');
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });

  }
  function triggerUpdateUserPhone(phoneNumber) {
    updateProfile(auth.currentUser, {
      phoneNumber: phoneNumber
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });

  }

  // 刪除帳號
  function triggerDeleteUser() {
    const user = auth.currentUser;

    deleteUser(user).then(function () {
      alert('刪除成功帳號！');
    }).catch(function (error) {
      alert('刪除帳號出現錯誤');
    });


  }


  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  function handleClick() {
    upload(photo, currentUser, setLoading);
    // 
    console.log("photo", photo)
    console.log("currentUser", currentUser)
  }



  async function upload(photo, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser.uid);
    setLoading(true);
    const snapshot = await uploadBytes(fileRef, photo);
    const photoURL = await getDownloadURL(fileRef);
    await updateProfile(currentUser, { photoURL });
    setPhotoURL(photoURL);
    // uploadBytes(fileRef, setPhoto).then((snapshot) => {
    // console.log("snapshot",snapshot)
    // updateProfile(currentUser, { photoURL });
    // getDownloadURL(snapshot.ref).then((photoURL) => {
    //   console.log("setPhotoURL",setPhotoURL)
    //   console.log("currentUser",currentUser)
    //   setPhotoURL(currentUser.photoURL);
    // });
    // });
    setLoading(false);
    alert("Uploaded file!");
  }
  useEffect(() => {
    // console.log("currentUser", currentUser)
    // console.log("photoURL", photoURL)
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser])


  const [favdata, setFavdata] = useState( );
  // console.log("todosbook", todosbook);
  useEffect(() => {
    const collectionRef = collection(db, currentUser.uid);
    // const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsub = onSnapshot(collectionRef, (snapshot) =>
    setFavdata(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
 

    );
    return unsub;
  }, []);

  // console.log("favdata", setFavdata)

  return (
    <div>
      <Navigation />


      <div className='center'>
        <div className='profile'>
          <h1>會員資料</h1>

          <div className="fields">

            <Avatar src={photoURL} alt="Avatar" className="avatar" />
            <input type="file" onChange={handleChange} />
            <button disabled={loading || !photo} onClick={handleClick}>上傳大頭照</button>

          </div>



          <p><strong>會員信箱: </strong>{currentUser?.email}</p>
          {/* <p>
            <strong>Email verified: </strong>
            {`${currentUser?.emailVerified}`}
          </p> */}
          <p>
            <strong>會員姓名: </strong>
          </p>
          <EdiText
            value={displayName}
            type="text"
            onSave={handleSave}
            editing={editing}
          />


          <p>
            <strong>會員電話: </strong>
            {currentUser?.phoneNumber !== null ? `${currentUser?.phoneNumber}` : ""}

          </p>
          {/* 
          <p>
            <EdiText
              type="textarea"
              saveButtonContent="Apply"
              cancelButtonContent={<strong>Cancel</strong>}
              editButtonContent="Edit"
              value="Why, Mr. Anderson? Why? Why do you persist?"
              onSave={this.onSave}
              hideIcons={true}
            />
          </p> */}

          {/* <button onClick={() => setEditing((v) => !v)}>Toggle</button> */}
          <div style={{ width: "50%", marginTop: 20 }}>
            {/*  Apply your changes below */}

          </div>

          <span onClick={() => signOut(auth)}>登出</span>
          <br />
          <span onClick={() => triggerDeleteUser()}>刪除帳號</span>
          <br />
          <span onClick={() => triggerChangeUserPassword()}>發送修改密碼信件</span>




        </div>
      </div>
      {/* 將  Profile 的useEffect 得到的data 傳到FavTable  ，FavTable props 就可以得到資料  */}
      <FavTable  favdata={favdata} currentUser={currentUser} />
      <Contact data={landingPageData.Contact} />
    </div>
  )
}


export const FavTable = (props) => {
  const { currentUser } = useAuthValue()
  const [data, setFavdata] = useState(  [] );
  console.log('FavTableprops' ,props.favdata)
  console.log('soezdata' ,soezdata)

  // console.log('FavTableFavdata' ,Favdata)
  const [selectedRows, setSelectedRows] = useState([]);
  function handleFav(e) {

    // setFav(!fav)
    console.log('1111111111111111111111111111111111111111111111111', e.target.value)

  }

 




useEffect(() => {
  const collectionRef = collection(db, currentUser.uid);
  // const q = query(collectionRef, orderBy("timestamp", "desc"));
  const unsub = onSnapshot(collectionRef, (snapshot) =>
  setFavdata(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))


  );
  return unsub;
}, []);
  // const StoreData = props.storepropsdata.mapStateToPropssoez.soez


  const columns = useMemo(() => PROFILE_COLUMNS, [])
  // const data = useMemo(() =>  Favdata, [])
  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter,

    }),
    []
  )

  // console.log("BasicTablecolumns", columns)
  // console.log("BasicTablecolumnssoezdata", soezdata)
  // console.log("BasicTablecolumnsprops", props)

  //設定動作，雖然現在是空的
  // const readsoezdata = article => ({ type: 'readsoezdata', payload: article })
  //將描述各個動作對資料的行為
  // const soezReducer = (state = soezdata, action) => {
  //   console.log("soezReducerBasicTablecolumnsstate", state)
  //   switch (action.type) {
  //     case "readsoezdata":
  //       break;
  //     default:
  //       return state
  //   }
  // }

  //建立保管資料的store
  // const store = createStore(soezReducer)
  // console.log("BasicTablecolumnsstore", store)
  //檢查store
  // console.log("BasicTablecolumnsstoregetState", store.getState())
  //測試用加上去的，等等再把它拿掉：
  // window.store = store;
  // window.readsoezdata = readsoezdata;


  // useEffect(() => {
  //   console.log('11111111111111 ',selectedFlatRows)
  //   const selected = selectedFlatRows.map( row  => row.original);
  //   setSelectedRows(selected);
  // }, [selectedFlatRows, setSelectedRows]);
  //要照這這個參數走
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    // rows,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
    // preFilteredRows,
    pageOptions,
    setPageSize,
    gotoPage,
    pageCount,
    preGlobalFilteredRows,
    state,
    selectedFlatRows,
    // state,
    setGlobalFilter
  } = useTable({

    columns,
    data,
    defaultColumn,

    initialState: { pageIndex: 0 }
  },

    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    )





  const { globalFilter, pageIndex, pageSize } = state
  // console.log("BasicTablecolumnsstate", state)
  return (
    <Styles >
      <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} filter={globalFilter} setFilter={setGlobalFilter} />
      {/* {console.log("123456789", preGlobalFilteredRows)} */}
      <div>
        <span style={{ textAlign: "left", color: "black", fontSize: "16px" }}>{preGlobalFilteredRows.length} 個 收藏</span>
        <div style={{ textAlign: "right", color: "red", fontSize: "16px" }}>(點擊欄位可排序)</div>
      </div>
      {/* Render the UI for your table */}
      <table id="featuretable" className="featuretable" {...getTableProps()} >
        <thead>

          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (

                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                  {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                  {/* Add a sort direction indicator */}

                  <span>

                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>

                </th>
              ))}
            </tr>
          ))}

 
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        {/* <tfoot>
          {footerGroups.map(footerGroup => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map(column => (
                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      <br></br>
      <span style={{ width: "100px", fontSize: "20px" }}>
        到第  {' '}
        <input
          type='number'
          defaultValue={pageIndex + 1}
          onChange={e => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(pageNumber)
          }}
          // eslint-disable-next-line no-undef
          style={{ width: '50px', textAlign: "center" }}
        />  頁
      </span>{' '}

      <span style={{ width: "100px", fontSize: "20px" }}>
        <br></br>
        頁數: {' '}
        <strong >
          第 {' '} <span style={{ color: "red" }} >{pageIndex + 1} </span >頁 , 共  {pageOptions.length}  頁
        </strong>{' '}
      </span >
      <div style={{ height: "5px" }} ></div>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'|<<'}
        </button>{' '}
        <span> &nbsp; </span>
        <button onClick={() => previousPage()} disabled={!canPreviousPage} style={{ width: "100px", fontSize: "20px" }} >
          上一頁
        </button>{' '}
        <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
        <button onClick={() => nextPage()} disabled={!canNextPage} style={{ width: "100px", fontSize: "20px" }}>
          下一頁
        </button>{' '}
        <span> &nbsp; </span>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>|'}
        </button>{' '}

      </div>
       
    </Styles>
  )
}




// const mapStateToProps = (state) => {
//   console.log("mapStateToProps = (state) ", state)
//   return {
//     mapStateToPropssoez: state 
//   }
// }
// export default compose(firestoreConnect(['soez']), connect(mapStateToProps))(Profile) 

// export default compose(
//   firestoreConnect(() => ['soez']), // or { collection: 'todos' }
//   connect((state, props) => ({
//     todos: state.firestore.ordered 
//   }))
// )(FavTable)