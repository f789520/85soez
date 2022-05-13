import styled from "styled-components";
import { useDispatch } from "react-redux";
import * as actions from "../actions/todos";
import React from "react";
import { connect } from 'react-redux';
import db from './fire'
import {
  doc,
  deleteDoc,
} from 'firebase/firestore';

const Input = styled.input`
  background-color: white;
  width: 40%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 0.05em;
  padding: 0 20px;
`;

const Container = styled.div.attrs({ className: 'Container' })`
  background-color: white;
  width: 80%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 0.05em;
  padding: 0 20px;
`;

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const TaskName = styled.div.attrs({ className: 'TaskName' })`
  flex-grow: 1;
  margin: 0 20px;
`;

const Button = styled.div`
  background-color: #bebebe;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  width: min-content;
  color: white;
  letter-spacing: 0.05em;
  cursor: pointer;
  margin-right:10px; 
  &:hover {
    background-color: #F5727E;
  }
`;

const UpdateButton = styled.div`
  background-color: #bebebe;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  width: min-content;
  color: white;
  letter-spacing: 0.05em;
  cursor: pointer; 
  &:hover {
    background-color: #F5727E;
  }
`;


function TaskItem(props) {
  // const { todolist } = props
  // console.log("todolist", props)

  const dispatch = useDispatch();
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");
  const submitEdits = () => {
    props.task.taskName = editingText; //Input 框
    props.todolist.forEach(function (item, i) {
      console.log("123456", i, item.taskName)
      if (editingText !== item.taskName) {
        dispatch(actions.editTask(props.task.id, props.task.taskName))
      } else {
        alert("已有同一個事項，將刪除")
        dispatch(actions.deleteTask(props.task.id))
      }
      setTodoEditing(null);
      setEditingText("")
    });


  }

  const deleteTask = () => {
    // console.log(" deleteTask props.task.taskName", props.task.taskName)
    deleteDoc(doc(db, "todosbook", props.task.taskName))
    dispatch(actions.deleteTask(props.task.id))
  }

  const toggleTask = (a, isCompleted) => {
    dispatch(actions.toggleTask(props.task.id, isCompleted))
  }

  return (
    <Container>
      <CheckBox
        type="checkbox"
        checked={props.task.isCompleted}
        // onChange={() => dispatch(actions.toggleTask(props.task.id))}
        onChange={(e) => toggleTask(props.task.id, e.target.checked)}
      />

      {/* JS 3元運算子  條件?():()  如果條件=true */}
      {todoEditing === props.task.id ? (
        <Input
          name="edittask"
          type="text"
          placeholder={"edit todo ..."}
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
        />
      ) : (
        < ul >
          <TaskName >{props.task.taskName} </TaskName>
        </ul>
      )}
      {todoEditing === props.task.id ? (
        <UpdateButton onClick={() => submitEdits(props.task.id)}>
          UpdateEdit
        </UpdateButton>
      ) : (
        <Button onClick={() => setTodoEditing(props.task.id)}>
          Edit
        </Button>
      )}

      <Button onClick={() => deleteTask(props.task.id)}>
        Delete
      </Button>
    </Container >
  );
}


const gg = (state) => {
  // console.log("gg = (state) ",state  )
  return {
    todolist: state.firestoreReducer.ordered.todosbook
  }
}

export default connect(gg)(TaskItem);