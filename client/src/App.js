import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Homepage from './components/layout/Homepage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import './App.css';

function App() {
  return (
    <div>
    <Header />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    <Footer />
    </div>
  );
}

export default App;
