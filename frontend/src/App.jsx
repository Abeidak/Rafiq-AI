import React, { useState } from 'react';
import KnowledgeInput from './components/KnowledgeInput';
import ChatInterface from './components/ChatInterface';
import AdminLogin from './components/AdminLogin';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>Rafiq-AI</h1>
          <button
            className="btn-admin-toggle"
            onClick={() => isAdmin ? setIsAdmin(false) : setShowLogin(true)}
          >
            {isAdmin ? 'Logout' : 'Admin'}
          </button>
        </div>
        <p>Virtual Secretary for Défi National Nuit de l'Info 2025</p>
      </header>

      <main className="main-content">
        {isAdmin && (
          <div className="left-column">
            <KnowledgeInput />
          </div>
        )}

        <div className={`right-column ${!isAdmin ? 'full-width' : ''}`}>
          <ChatInterface />
        </div>
      </main>

      {showLogin && (
        <AdminLogin
          onLogin={() => setIsAdmin(true)}
          onClose={() => setShowLogin(false)}
        />
      )}
    </div>
  );
}

export default App;
