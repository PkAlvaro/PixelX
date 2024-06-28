import React from 'react';
import ReactDOM from 'react-dom/client';
import '../assets/styles/commonApp/index.css';
import Routing from './Routing.jsx';
import AuthProvider from '../auth/AuthProvider.jsx';
import GameProvider from '../context/GameProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <GameProvider>
        <Routing />
      </GameProvider>
    </AuthProvider>
  </React.StrictMode>
);
