console.log("--- BACKEND CODE v1.1 FINAL ---");
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// --- API ROUTES ---

// 1. Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const client = await pool.connect();
    const time = await client.query('SELECT NOW()');
    client.release();
    res.json({ status: 'ok', message: 'Backend is running!', db_time: time.rows[0].now });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'DB connection failed', error: err.message });
  }
});

// 2. GET all products <-- THIS IS THE MISSING PIECE
app.get('/api/products', async (req, res) => {
  try {
    const allProducts = await pool.query('SELECT * FROM products ORDER BY id ASC');
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error while fetching products' });
  }
});

// 3. CREATE a new product
app.post('/api/products', async (req, res) => {
  try {
    const { name, sku, price, stock_quantity } = req.body;
    if (!name || !sku || price === undefined || stock_quantity === undefined) {
      return res.status(400).json({ error: 'Name, SKU, price, and stock_quantity are required' });
    }
    const newProduct = await pool.query(
      'INSERT INTO products (name, sku, price, stock_quantity) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, sku, price, stock_quantity]
    );
    res.status(201).json(newProduct.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'A product with this SKU already exists.' });
    }
    console.error(err.message);
    res.status(500).json({ error: 'Server error while creating product' });
  }
});

// --- START SERVER ---
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});