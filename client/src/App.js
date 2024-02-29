import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Homepage from './components/layout/Homepage';
import Login from './components/auth/Login';
import './App.css';
function App() {
  return (<Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
