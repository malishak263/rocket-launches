import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Launches from './components/Launches';
import FullDetails from './components/FullDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Launches />} />
        <Route path="/" element={<Launches />} />
        <Route path="/launch/:id" element={<FullDetails/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
