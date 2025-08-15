import { useState, useEffect } from 'react'
import './App.css'
import AddProductForm from './AddProductForm'; // <-- 1. IMPORT our form component

// Make sure this is your current, live backend URL from the 'Ports' tab
const BACKEND_URL = 'https://3001-trashad2392-possystemmv-t244vrr9wjx.ws-eu121.gitpod.io';

function App() {
  const [healthMessage, setHealthMessage] = useState('Loading backend status...');

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/health`)
      .then(response => response.json())
      .then(data => {
        setHealthMessage(`Backend status: ${data.status} - DB Time: ${data.db_time}`);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setHealthMessage('Failed to connect to backend. Is it running?');
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>POS System Status</h1>
        <p>{healthMessage}</p>
      </header>
      <hr />
      <main>
        {/* 2. USE our form component here */}
        <AddProductForm backendUrl={BACKEND_URL} />
      </main>
    </div>
  )
}

export default App