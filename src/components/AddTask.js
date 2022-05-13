import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../actions/todos";
import { addTask } from "../actions/todos";
import { connect } from 'react-redux'
import addIcon from "../assets/icon/add.png";


const Input = styled.input.attrs({ className: 'Input' })`
  padding: 0.5em;
  margin: 0.5em;
  background-color: inherit;
  border: none;
  border-bottom: 2px solid #333;
  width: 300px;
  font-size: 16px;
  letter-spacing: 0.05em;
  img {cursor: pointer;}
  &::placeholder {color: #333;}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin: 25px auto 40px;
`;

const AddBtn = styled.button`
  padding: 0;
  border: none;
  height: 27px;
  width: 27px;
  background-color: inherit;  
  img {
    cursor: pointer;
  }
`;

function AddTask(props) {
  // console.log("AddTask(props)", props)

  const dispatch = useDispatch();
  const [taskName, setnewTask] = useState("");
  const handleChange = (event) => {
    setnewTask(event.target.value);
  };

  const handleClick = async (event) => {
    if (taskName === "") return; //檢查有沒有輸入任務名稱  +

    props.todolist.forEach(function (item, i) {
      // console.log("props.todolist.forEach", i, item.taskName)
      if (taskName === item.taskName) {
        alert("重複事項 ， 請重新輸入")
        setnewTask("");
        dispatch(actions.toggleTask())
      }
    });

    dispatch(actions.addTask(taskName));
    setnewTask("");
  };

  return (
    <Wrapper>
      <Input
        name="addtask"
        type="text"
        placeholder={"add todo ..."}
        value={taskName}
        onChange={handleChange}
      />
      <AddBtn onClick={() => handleClick()} >
        <img src={addIcon} alt="" />
      </AddBtn>
    </Wrapper>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    addTask: (taskName) => dispatch(addTask(taskName))
  }
}

const gg = (state) => {
  // console.log("gg = (state) ", state)
  return {
    todolist: state.firestoreReducer.ordered.todosbook
  }
}

export default connect(gg, mapDispatchToProps)(AddTask)