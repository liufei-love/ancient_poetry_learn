import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DynastyDetail from './pages/DynastyDetail';
import ArtifactDetail from './pages/ArtifactDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dynasty/:id" element={<DynastyDetail />} />
        <Route path="/artifact/:id" element={<ArtifactDetail />} />
      </Routes>
    </Router>
  );
}

export default App;