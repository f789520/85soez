import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Todo from "./ListPage";
import Home from "./HomePage";
import Detail from "./DetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/list" element={<Todo />} />
        <Route path="*" element={<p>找不到頁面</p>} />
      </Routes>
    </Router>
  );
}

export default App;


