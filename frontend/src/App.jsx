import { useState, useEffect } from 'react'
import './App.css'

// Make sure this URL is correct for your current workspace!
const BACKEND_URL = 'https://3001-trashad2392-possystemmv-xp62vrshay0.ws-eu121.gitpod.io';

function App() {
  const [message, setMessage] = useState('Loading backend status...');

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/health`)
      .then(response => response.json())
      .then(data => {
        setMessage(`Backend status: ${data.status} - DB Time: ${data.db_time}`);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMessage('Failed to connect to backend. Is it running?');
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>POS System Status</h1>
        <p>{message}</p>
      </header>
    </div>
  )
}

export default App