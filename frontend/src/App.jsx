import { useState, useEffect } from 'react'
import './App.css'
import AddProductForm from './AddProductForm';
import ProductList from './ProductList';

// Using the proxy, so this is an empty string
const BACKEND_URL = ''; 

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>POS System Inventory</h1>
      </header>
      <hr />
      <main>
        <AddProductForm backendUrl={BACKEND_URL} onProductAdded={fetchProducts} />
        <hr />
        <ProductList products={products} />
      </main>
    </div>
  )
}

export default App