import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Protected from './components/proteced';
import './index.css';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/protected"
          element={token ? <Protected token={token} /> : <Login setToken={setToken} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
