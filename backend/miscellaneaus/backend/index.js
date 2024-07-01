const express = require('express');
const app = express();

const port = 3000;

app.listen(port, () => {
  console.log('Server is running on port 3000');
});

app.get('/register', (req, res) => {
  const { user , password } = req.query;
  res.send(`Welcome to ${user}`);
});

app.post('/register', (req, res) => {
  res.send('post');
});