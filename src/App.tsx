import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PoetList from './components/PoetList';
import PoetDetail from './components/PoetDetail';
import PoemGame from './components/PoemGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PoetList />} />
        <Route path="/poet/:id" element={<PoetDetail />} />
        <Route path="/poem/:id" element={<PoemGame />} />
      </Routes>
    </Router>
  );
}

export default App;