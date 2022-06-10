import "./profile.css"; 
import "./react-editext.css";
import styled from "styled-components";
import { useAuthValue } from "./AuthContext";
import { Navigation } from "./navigation";
import React, { useMemo, useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getAuth, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { useFirestoreConnect } from "react-redux-firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { storage } from "./fire";
import { Contact } from "./contact";
import JsonData from "../data/data.json";
import EdiText from "react-editext";
import { PROFILE_COLUMNS } from "./storecolumns";
import { GlobalFilter } from "./GlobalFilter";
import { ColumnFilter } from "./ColumnFilter";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import db from "./fire";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Styles = styled.div`
  @media (max-width: 360px) {
    th:nth-of-type(1),
    th:nth-of-type(4),
    th:nth-of-type(7),
    td:nth-of-type(1),
    td:nth-of-type(4),
    td:nth-of-type(7),
    th:nth-of-type(6),
    td:nth-of-type(6),
    th:nth-of-type(2),
    td:nth-of-type(2) {
      display: none;
      font-size: 10px;
    }
    th:nth-of-type(3),
    td:nth-of-type(3),
    th:nth-of-type(5),
    td:nth-of-type(5) {
      font-size: 20px;
    }
  }

  @media (min-width: 570px) and (max-width: 1200px) {
    th:nth-of-type(4),
    th:nth-of-type(7),
    td:nth-of-type(4),
    td:nth-of-type(7),
    th:nth-of-type(2),
    td:nth-of-type(2) {
      display: none;
    }
    .featuretable {
      font-size: 20px;
    }
  }

  @media (min-width: 360px) and (max-width: 570px) {
    th:nth-of-type(4),
    th:nth-of-type(7),
    td:nth-of-type(4),
    td:nth-of-type(7),
    th:nth-of-type(2),
    td:nth-of-type(2),
    th:nth-of-type(1),
    td:nth-of-type(1) {
      display: none;
    }
    .featuretable {
      font-size: 20px;
    }
  }
`;

const Avatar = styled.img.attrs({ className: "Avatar" })`
  vertical-align: middle;
  width: 200px;
  height: 150px;
  border-radius: 10%;
  border-width: 2px;
  border-color: gray;
  border-style: outset;
  object-fit: cover;
`;

const StyledEdiText = styled(EdiText)`
  .styles-module_Editext__buttons_after_aligned__2ZHQz {
    margin-left: 20px;
  }
  .styles-module_Editext__button__sxYQX {
    padding: 0em;
  }
  button {
    border-radius: 5px;
  }
  button[editext="edit-button"] {
    color: #1976d2;
    text-align: center;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    &:hover {
      background: beige;
    }
  }
  button[editext="save-button"] {
    width: 50px;
    height: 25px;
    &:hover {
      background: greenyellow;
    }
  }
  button[editext="cancel-button"] {
    height: 25px;
    &:hover {
      background: crimson;

      color: #fff;
    }
  }
  input,
  textarea {
    /* background: #1D2225; */
    color: black;
    /* font-weight: bold; */
    border-radius: 5px;
    height: 25px;
    width: 150px;
  }
  div[editext="view-container"],
  div[editext="edit-container"] {
    padding-left: 5px;
    border-radius: 5px;
    color: #777;
  }
`;

export const Profile = () => {
  window.scrollTo(0, 0);
  const [editing, setEditing] = useState(false);
  const [landingPageData, setLandingPageData] = useState({});
  const auth = getAuth();
  const { currentUser } = useAuthValue();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const [displayName, setDisplayName] = useState(currentUser?.displayName);
  const [favdata, setFavdata] = useState();

  useFirestoreConnect([{ collection: "soez" }]);

  const handleSave = (displayName) => { 
    setDisplayName(displayName);
    triggerUpdateUser(displayName);
  };

  function triggerChangeUserPassword() {
    sendPasswordResetEmail(auth, auth.currentUser.email).then(
      function () {
        handleClickOpenEmailConfirm();
      },
      function (error) {
        // An error happened.
        // console.error("更改密碼", error);
        alert("更改密碼Email發送失敗");
      }
    );
  }

  function triggerUpdateUser(displayName) {
    updateProfile(auth.currentUser, {
      displayName: displayName,
    })
      .then(() => {
        // alert('更改會員姓名成功!!');
        handleClickOpenName();
        // Profile updated!
      })
      .catch((error) => {
        // An error occurred
      });
  }

  // 刪除帳號
  function triggerDeleteUser() {
    const user = auth.currentUser;
    deleteUser(user)
      .then(function () {
        // alert('刪除成功帳號！');
        // handleClickOpenDelete();
      })
      .catch(function (error) {
        alert("刪除帳號出現錯誤，請重新登入再操作一次");
      });
  }

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    upload(photo, currentUser, setLoading);
  }

  async function upload(photo, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser.uid);
    setLoading(true);
    const snapshot = await uploadBytes(fileRef, photo);
    const photoURL = await getDownloadURL(fileRef);
    await updateProfile(currentUser, { photoURL });
    setPhotoURL(photoURL);
    setLoading(false);
    handleClickOpenImg();
  }

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openEmailConfirm, setOpenEmailConfirm] = React.useState(false);
  const handleClickOpenEmailConfirm = () => {
    setOpenEmailConfirm(true);
  };
  const handleCloseEmailConfirm = () => {
    setOpenEmailConfirm(false);
  };

  const [openImg, setOpenImg] = React.useState(false);
  const handleClickOpenImg = () => {
    setOpenImg(true);
  };
  const handleCloseImg = () => {
    setOpenImg(false);
  };

  const [openName, setOpenName] = React.useState(false);
  const handleClickOpenName = () => {
    setOpenName(true);
  };
  const handleCloseName = () => {
    setOpenName(false);
  };

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  useEffect(() => {
    const collectionRef = collection(db, currentUser.uid);
    const unsub = onSnapshot(collectionRef, (snapshot) =>
      setFavdata(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsub;
  }, [currentUser.uid]);

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <div className="center">
        <div className="profile">
          <h1>會員資料</h1>
          <div className="fields" style={{ position: "relative" }}>
            <Avatar src={photoURL} alt="Avatar" className="avatar" />
            <label
              htmlFor="contained-button-file"
              style={{ position: "absolute", bottom: "-20px" }}
            >
              <input
                accept="image/*"
                onChange={handleChange}
                id="contained-button-file"
                multiple
                type="file"
                style={{ display: "none" }}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
          <div style={{ height: "10px" }}></div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Button
              style={{ width: "100px" }}
              variant="contained"
              disabled={loading || !photo}
              onClick={handleClick}
            >
              上傳大頭照
            </Button>
          </div>
          <div style={{ height: "1px" }}></div>
          <hr
            style={{
              opacity: "0.1",
              background: "black",
              width: "100%",
              height: "1px",
            }}
          />
          <p style={{ fontSize: "20px" }}>
            <strong>會員信箱: </strong>
            {currentUser?.email}
          </p>
          <div style={{ height: "5px" }}></div>
          <div
            style={{ display: "flex", textAlign: "center", fontSize: "20px" }}
          >
            <strong>會員姓名: </strong>
            <StyledEdiText
              value={displayName}
              type="text"
              onSave={handleSave}
              editing={editing}
            />
          </div>
          <div style={{ height: "5px" }}></div>
          <br />
          <div style={{ display: "flex", justifyContent: " space-between" }}>
            <Button
              variant="outlined"
              style={{ fontSize: "16px" }}
              onClick={handleClickOpen}
            >
              刪除帳號
            </Button>
            <br />
            <Button
              variant="outlined"
              style={{ fontSize: "16px" }}
              onClick={() => triggerChangeUserPassword()}
            >
              發送修改密碼信件
            </Button>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle style={{ fontSize: "20px" }} id="alert-dialog-title">
              {"真的要刪除帳號嗎?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                style={{ fontSize: "20px" }}
                id="alert-dialog-description"
              >
                注意!! 您正在刪除 85 SOEZ 會員帳號，刪除後您收藏的物件會不見喔~
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button style={{ fontSize: "20px" }} onClick={handleClose}>
                不刪除
              </Button>
              <Button
                style={{ fontSize: "20px" }}
                onClick={() => triggerDeleteUser()}
                autoFocus
              >
                確認刪除帳號
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openEmailConfirm}
            onClose={handleCloseEmailConfirm}
            aria-labelledby="alert-dialog-title-EmailConfirm"
            aria-describedby="alert-dialog-description-EmailConfirm"
          >
            <DialogTitle
              style={{ fontSize: "20px" }}
              id="alert-dialog-title-EmailConfirm"
            >
              {"發送修改密碼信件成功，請至信箱確認"}
            </DialogTitle>
            <DialogActions>
              <Button
                style={{ fontSize: "20px" }}
                onClick={handleCloseEmailConfirm}
              >
                確認
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openImg}
            onClose={handleCloseImg}
            aria-labelledby="alert-dialog-title-Img"
          >
            <DialogTitle
              style={{ fontSize: "20px" }}
              id="alert-dialog-title-Img"
            >
              {"大頭貼上傳成功!!"}
            </DialogTitle>
            <DialogActions>
              <Button style={{ fontSize: "20px" }} onClick={handleCloseImg}>
                確認
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openName}
            onClose={handleCloseName}
            aria-labelledby="alert-dialog-title-Name"
          >
            <DialogTitle
              style={{ fontSize: "20px" }}
              id="alert-dialog-title-Name"
            >
              {"會員姓名修改成功!!"}
            </DialogTitle>
            <DialogActions>
              <Button style={{ fontSize: "20px" }} onClick={handleCloseName}>
                確認
              </Button>
            </DialogActions>
          </Dialog>

          {/*<Dialog
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="alert-dialog-title-Delete">
            <DialogTitle  style={{fontSize:"20px"}} id="alert-dialog-title-Delete">
              {"刪除會員成功!!"}
            </DialogTitle>
            <DialogActions>
              <Button  style={{fontSize:"20px"}} onClick={handleCloseDelete}>確認</Button>
            </DialogActions>
          </Dialog> */}
        </div>
        <div className="text-center">
          <div className="container">
            <FavTable favdata={favdata} currentUser={currentUser} />
          </div>
        </div>
      </div>
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export const FavTable = () => {
  const { currentUser } = useAuthValue();
  const [data, setFavdata] = useState([]);
  const columns = useMemo(() => PROFILE_COLUMNS, []);
  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

  useEffect(() => {
    const collectionRef = collection(db, currentUser.uid);
    const unsub = onSnapshot(collectionRef, (snapshot) =>
      setFavdata(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsub;
  }, [currentUser.uid]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
    pageOptions,
    setPageSize,
    gotoPage,
    pageCount,
    preGlobalFilteredRows,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <Styles>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        filter={globalFilter}
        setFilter={setGlobalFilter}
      />
      <div>
        <span style={{ textAlign: "left", color: "black", fontSize: "16px" }}>
          {preGlobalFilteredRows.length} 個 收藏
        </span>
        <div style={{ textAlign: "right", color: "red", fontSize: "16px" }}>
          (點擊欄位可排序)
        </div>
      </div>
      <table id="featuretable" className="featuretable" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br></br>
      <span style={{ width: "100px", fontSize: "25px" }}></span>{" "}
      <div style={{ height: "0px" }}></div>
      <span style={{ width: "100px", fontSize: "20px" }}>
        <br></br>{" "}
        <strong>
          第 <span style={{ color: "red" }}>{pageIndex + 1} </span>頁 , 共{" "}
          {pageOptions.length} 頁
        </strong>{" "}
      </span>
      <div style={{ height: "10px" }}></div>
      <FormControl variant="outlined">
        <Select
          style={{
            height: "45px",
            width: "200px",
            fontSize: "20px",
            lineHeight: "25px",
            textAlign: "center",
          }}
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem style={{ fontSize: "20px" }} value={10}>
            顯示 10 個物件
          </MenuItem>
          <MenuItem style={{ fontSize: "20px" }} value={25}>
            顯示 25 個物件
          </MenuItem>
          <MenuItem style={{ fontSize: "20px" }} value={50}>
            顯示 50 個物件
          </MenuItem>
        </Select>
      </FormControl>
      <div style={{ height: "20px" }}></div>
      <div>
        <Button
          variant="contained"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"|＜＜"}
        </Button>{" "}
        <span> &nbsp; </span>
        <Button
          variant="contained"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          style={{ width: "100px", fontSize: "20px" }}
        >
          上一頁
        </Button>{" "}
        <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
        <Button
          variant="contained"
          onClick={() => nextPage()}
          disabled={!canNextPage}
          style={{ width: "100px", fontSize: "20px" }}
        >
          下一頁
        </Button>{" "}
        <span> &nbsp; </span>
        <Button
          variant="contained"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {"＞＞|"}
        </Button>{" "}
        <div style={{ height: "5px" }}></div>
      </div>
    </Styles>
  );
};
