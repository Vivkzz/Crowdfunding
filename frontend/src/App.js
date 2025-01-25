import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WalletConnect from './components/WalletConnect';
import CreateCampaign from './components/CreateCampaign';
import CampaignList from './components/CampaignList';

function App() {
  return (
    <Router>
      <div>
        <h1>Gasless App</h1>
        <WalletConnect />
        <Routes>
          <Route path="/" element={<CampaignList />} />
          <Route path="/create" element={<CreateCampaign />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;