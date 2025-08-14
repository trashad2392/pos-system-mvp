const express = require('express');
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.send('The backend server is running!');
});

app.listen(PORT, () => {
  console.log(`Backend server started on http://localhost:${PORT}`);
});