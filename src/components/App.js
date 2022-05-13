import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Todo from "./ListPage";
import Home from "./HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<Todo />} />
        <Route path="*" element={<p>找不到頁面</p>} />
      </Routes>
    </Router>
  );
}

export default App;


