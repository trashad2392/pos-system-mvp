import { useState, useEffect } from 'react'
import './App.css'
import AddProductForm from './AddProductForm';
import ProductList from './ProductList';

// We will update this with the live URL once the server is running
const BACKEND_URL = 'https://3001-trashad2392-possystemmv-t244vrr9wjx.ws-eu121.gitpod.io'; 

function App() {
  const [healthMessage, setHealthMessage] = useState('Loading backend status...');

  useEffect(() => {
    if (BACKEND_URL === 'placeholder') {
      setHealthMessage('Backend URL not set. Please update App.jsx');
      return;
    }
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
        <AddProductForm backendUrl={BACKEND_URL} />
        <hr />
        <ProductList backendUrl={BACKEND_URL} />
      </main>
    </div>
  )
}

export default App