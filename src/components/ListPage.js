import styled from "styled-components";
import "./app.css";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import { Link } from "react-router-dom"; 

const Wrapper = styled.div`
  background-color: #a8d0eb;
  height: 100vh;
  padding-top: 70px;
`;

const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-weight: bold;
  font-size: 28px;
  letter-spacing: 2px;
  color: blak;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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

function IndexBtn() {
  return (
    <ButtonContainer>
      <Button>
        <Link to='/'>回首頁</Link>
      </Button>
    </ButtonContainer>
  );
}

function Todo() {
  return (
    <Wrapper>
      <Title>Todolist</Title> 
      <AddTask/>
      <TaskList/>
      <IndexBtn/>
    </Wrapper>
  );
}

export default Todo;