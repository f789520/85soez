import styled from "styled-components";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from 'react-redux-firebase'
import Filter from "./Filter";
import TaskItem from "./TaskItem";
import { connect } from 'react-redux'
import db from './fire'
import { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import React from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const Wrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  max-width: 600px;
  min-width: 300px;
`;

const TaskItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px 0;
  background-color: #f8f8f8;
`;

function TaskList(props, state) {

  // console.log("TaskList this.props", props);
  // console.log("TaskList this.state", state);
  // const { mapStateToPropstodosbook } = props
  // console.log("mapStateToPropstodosbook", mapStateToPropstodosbook);

  useFirestoreConnect([
    { collection: 'todosbook' }
  ]);
  const tasks = useSelector((store) => store.todosReducer);
  const filter = useSelector((store) => store.filterReducer);
  const firebaseData = useSelector((store) => store.firestoreReducer);

  // firebase資料庫
  const [todosbook, setTodos] = useState([{ taskName: "Loading...", idnn: "initial" }]);
  // console.log("todosbook", todosbook);
  useEffect(() => {
    const collectionRef = collection(db, "todosbook");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsub;
  }, []);

  const renderItems = () => {
    let list = [];
    todosbook.forEach((item) => {
      if (
        (filter === "SHOW_ALL") ||
        (filter === "SHOW_TODO" && !item.isCompleted) ||
        (filter === "SHOW_DONE" && item.isCompleted)
      ) {
        list.push(
          <TaskItem key={item.taskName} task={{ ...item }} />
        );
      }
    });
    // console.log("list2", list);
    // console.log("tasks", tasks)
    // console.log("todosbook", todosbook)
    // console.log("firebaseData", firebaseData.ordered.todosbook)
    // console.log("firestoreConnect(['todosbook']", firestoreConnect(['todosbook']))
    return list;
  };
  return (
    <Wrapper>
      <Filter selected={filter} />
      <TaskItemContainer>{renderItems()}</TaskItemContainer>
    </Wrapper>
  );
};


// export default TaskList; //test1

// const mapStateToProps = (state) => {
//   console.log("state",state)
//   return {
//     mapStateToPropstodosbook: state.todosReducer  ,
//   }
// }
// export default connect(mapStateToProps)(TaskList)   //test2


const mapStateToProps = (state) => { 
  // console.log("mapStateToProps = (state) ",state  )
  return {
    mapStateToPropstodosbook: state.firestoreReducer.ordered.todosbook
  }
}
export default compose(firestoreConnect(['todosbook']), connect(mapStateToProps))(TaskList)  //test3
