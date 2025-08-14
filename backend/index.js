const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 3001;

app.use(cors());

// This uses the DATABASE_URL provided by Docker Compose
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/api/health', async (req, res) => {
  try {
    const client = await pool.connect();
    const time = await client.query('SELECT NOW()');
    client.release();
    res.json({
      status: 'ok',
      message: 'Backend is running!',
      db_time: time.rows[0].now
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'DB connection failed', error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});