import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';

const Home = () => (
  <div>
    <h1>Stock Predictor Home</h1>
    <p>Welcome to the Stock Predictor! Please select one of the pages below:</p>
    <nav style={{ marginTop: '20px' }}>
      <Link to="/game" style={{ marginRight: '10px' }}>Stock Game</Link>
      <Link to="/results">Prediction Results</Link>
    </nav>
  </div>
);

const App = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Page1 />} />
        <Route path="/results" element={<Page2 />} />
      </Routes>
    </div>
  );
};

export default App;
