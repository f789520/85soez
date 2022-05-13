import styled from "styled-components";
import { Link } from "react-router-dom"; 
import React, { Component } from 'react'
import db from './fire'
import { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  addDoc,
  setDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore'



const Head = styled.div.attrs({ className: 'Head' })`
  background-color: #1d82c7;
  height: 30vh ;
  padding-top: 70px;
  text-align: center;
`;

const Main = styled.div.attrs({ className: 'Main' })`
  background-color: #91d2ff;
  height: 20vh ;
  padding-top: 70px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin:20px
`;


const Button = styled.div`
  background-color: ${(props) => (props.active ? "#ffc236" : "#bebebe")};
  border: none;
  border-bottom: 2px solid #3c5d95;
  border-radius: 3px 3px 0 0;
  padding: 5px;
  color: black;
  letter-spacing: 0.1em;
  text-align: center;
  cursor: pointer;
  width:90px;
`;

const Dot = ({ color }) => {
  const style = {
    height: 25,
    width: 25,
    margin: "0px 10px",
    backgroundColor: color,
    borderRadius: "50%",
    display: "inline-block",
  };
  return <span style={style}></span>;
};

 

function ListBtn() {
  return (
    <ButtonContainer>
      <Button>
        <Link to='/list'>Todolist</Link>
      </Button>
    </ButtonContainer>
  );
} 

function Home() {
  return (
    <div>
      <Head>
        <h1>React 練習專案</h1>
       
      </Head>
      <Main>
        <h1>歡迎光臨我的頁面</h1>
      </Main>
      <ListBtn />
      <div>輸入顏色及顏色代碼--TEST，請忽略</div>
      <Firetest />
    </div> 
  );
} 

export default Home;
 
function Firetest() {
  const [colors, setColors] = useState([{ name: "Loading...", id: "initial" }]);

  console.log(colors);

  /*渲染後 資料沒變 就不操作 >> 帶空陣列*/
  /* useEffect(
    () =>
      onSnapshot(collection(db, "colors"), (snapshot) =>
        setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })
        )), 
      ),
    [] 
  ); */


  useEffect(() => {
    const collectionRef = collection(db, "colors");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsub = onSnapshot(q, (snapshot) =>
      setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );

    return unsub;
  }, []);
 
  const handleNew = async () => {
    /* const docRef = doc(db, "color", "color001");
    const payload = { name: "black", value: "#00000" }
    await setDoc(docRef, payload); */
    const name = prompt("Enter color name");
    const value = prompt("Enter color value");
    const collectionRef = collection(db, "colors");
    const payload = { name, value, timestamp: serverTimestamp() };
    console.log("payload:" + payload)
    const docRef = await addDoc(collectionRef, payload);
    console.log("The new ID is: " + docRef.id);
  };

  const handleEdit = async (id) => {
    const name = prompt("Enter color name");
    const value = prompt("Enter color value");
    const docRef = doc(db, "colors", id);
    const payload = { name, value };


    setDoc(docRef, payload);

    /* const name = prompt("Enter color name");
    const value = prompt("Enter color value"); 
    const docRef = doc(db, "colors", id);
    const payload = { name, value, timestamp: serverTimestamp() }; 
    updateDoc(docRef, payload); */ 
  }; 

  const handleDelete = async (id) => {
    const docRef = doc(db, "colors", id);
    await deleteDoc(docRef);
  };

  const handleQueryDelete = async () => {
    const userInputName = prompt("Enter color name");

    const collectionRef = collection(db, "colors");
    const q = query(collectionRef, where("name", "==", userInputName));
    const snapshot = await getDocs(q);

    const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    results.forEach(async (result) => {
      const docRef = doc(db, "colors", result.id);
      await deleteDoc(docRef);
    });
  };

  return (
    <div className="root">
      <button className="button" onClick={handleNew}>
        New
      </button>
      <button className="button" onClick={handleQueryDelete}>
        Query Delete
      </button>
      <ul>

        {colors.map((bb) => (
          <li key={bb.id}>
            <button className="button2" onClick={() => handleEdit(bb.id)}>
              edit
            </button>
            <button className="button2" onClick={() => handleDelete(bb.id)}>
              delete
            </button>
            <Dot color={bb.value} /> {bb.name}
          </li>
        ))}
      </ul>
    </div>
  );
}