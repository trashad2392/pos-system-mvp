import React, { useState, useEffect } from 'react';

function ProductList({ backendUrl }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // This function will fetch the products from our API
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/products`);
        if (!response.ok) {
          throw new Error('Data fetching failed');
        }
        const data = await response.json();
        setProducts(data); // Store the fetched products in our state
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []); // The empty array [] means this runs only once when the page loads

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  return (
    <div>
      <h2>Product List</h2>
      <table border="1" cellPadding="5" style={{ margin: 'auto' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>${parseFloat(product.price).toFixed(2)}</td>
              <td>{product.stock_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;