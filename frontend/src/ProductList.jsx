import React from 'react';

// It now receives the list of products directly as a prop
function ProductList({ products }) {
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
          {/* We check if products is an array before mapping it */}
          {Array.isArray(products) && products.map((product) => (
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