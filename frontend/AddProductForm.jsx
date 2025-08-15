import React, { useState } from 'react';

function AddProductForm({ backendUrl }) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('Adding product...');
    const productData = {
      name,
      sku,
      price: parseFloat(price),
      stock_quantity: parseInt(stockQuantity, 10),
    };

    try {
      const response = await fetch(`${backendUrl}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to add product');
      }
      setMessage(`Successfully added product: ${result.name} (ID: ${result.id})`);
      setName('');
      setSku('');
      setPrice('');
      setStockQuantity('');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Submission error:', error);
    }
  };

  return (
    <div>
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div><label>Name: </label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></div>
        <div><label>SKU: </label><input type="text" value={sku} onChange={(e) => setSku(e.target.value)} required /></div>
        <div><label>Price: </label><input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required /></div>
        <div><label>Stock Quantity: </label><input type="number" step="1" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} required /></div>
        <button type="submit">Add Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
export default AddProductForm;