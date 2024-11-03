import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import './App.css';
import './index.css';

const App: React.FC = () => {
    return (
        <div className="grad">
          <Router>
            <GameProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/game/:gameId" element={<GamePage />} />
                </Routes>
            </GameProvider>
        </Router>
        </div>
    );
};

export default App;