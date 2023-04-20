// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { authenticate, generateToken } = require('./auth');
const users = require('./users');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username,password)
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credential' });
  }
  const token = generateToken(user);
  return res.json({ user, token });
});

app.get('/protected', authenticate, (req, res) => {
  // authorized user can access this route
  return res.json({ message: 'This is a protected route' });
});

app.post('/addition', authenticate, (req, res) => {
  const { num1, num2 } = req.body;
  const result = num1 + num2;
  return res.json({ result });
});

app.post('/subtraction', authenticate, (req, res) => {
  const { num1, num2 } = req.body;
  const result = num1 - num2;
  return res.json({ result });
});

app.post('/multiplication', authenticate, (req, res) => {
  const { num1, num2 } = req.body;
  const result = num1 * num2;
  return res.json({ result });
});

app.post('/division', authenticate, (req, res) => {
  const { num1, num2 } = req.body;
  if (num2 === 0) {
    return res.status(400).json({ message: 'Division by zero' });
  }
  const result = num1 / num2;
  return res.json({ result });
});

app.listen(3000, () => console.log('Server running on port 3000'));
