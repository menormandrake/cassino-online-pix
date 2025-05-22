import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import GameList from './components/GameList';
import DepositWithdraw from './components/DepositWithdraw';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/games" element={<GameList />} />
      <Route path="/banking" element={<DepositWithdraw />} />
    </Routes>
  </Router>
);

export default App;
