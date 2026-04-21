import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showLogin, setShowLogin] = useState(true);

  // LOGGED IN STATE
  if (token) {
    return (
      <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#333', color: 'white', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>AI Notes 🤖</h2>
          <button 
            onClick={() => { localStorage.clear(); setToken(null); }}
            style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </nav>
        
        <Dashboard />
      </div>
    );
  }

  // LOGGED OUT STATE
  return (
    <div className="App" style={{ fontFamily: 'Arial', backgroundColor: '#f0f2f5', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {showLogin ? <Login setToken={setToken} /> : <Signup />}
      
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <span>{showLogin ? "Don't have an account?" : "Already have an account?"}</span>
        <button 
          onClick={() => setShowLogin(!showLogin)} 
          style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline', marginLeft: '5px' }}
        >
          {showLogin ? "Signup here" : "Login here"}
        </button>
      </div>
    </div>
  );
}

export default App;
