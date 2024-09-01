import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Callback from './Callback';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>OAuth2.0 Login with Authorization Code Flow</h1>
        <Routes>
          <Route path="/callback" element={<Callback />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
