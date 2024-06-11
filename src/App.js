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
        <Route path="/" exact component={Launches} />
        <Route path="/launch/:id" component={FullDetails} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
//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