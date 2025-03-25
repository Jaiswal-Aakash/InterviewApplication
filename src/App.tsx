import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MeetingRoom from './pages/MeetingRoom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/meeting/:id" element={<MeetingRoom />} />
    </Routes>
  );
}

export default App;