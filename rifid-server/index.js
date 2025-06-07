const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Use cors middleware
app.use(cors());

// Dummy data
const data = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 3, name: 'Bob Johnson', age: 40 },
  { id: 4, name: 'Bob Johnson', age: 40 }
];

// Endpoint to get the data
app.get('/api/data', (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
