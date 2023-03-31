const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;

  if (!num1 || !num2) {
    res.status(400).json({ message: 'Both numbers are required' });
    return;
  }

  const result = parseFloat(num1) + parseFloat(num2);
  res.json({ result });
});

app.post('/subtract', (req, res) => {
  const { num1, num2 } = req.body;

  if (!num1 || !num2) {
    res.status(400).json({ message: 'Both numbers are required' });
    return;
  }

  const result = parseFloat(num1) - parseFloat(num2);
  res.json({ result });
});

app.post('/multiply', (req, res) => {
  const { num1, num2 } = req.body;

  if (!num1 || !num2) {
    res.status(400).json({ message: 'Both numbers are required' });
    return;
  }

  const result = parseFloat(num1) * parseFloat(num2);
  res.json({ result });
});

app.post('/divide', (req, res) => {
  const { num1, num2 } = req.body;

  if (!num1 || !num2) {
    res.status(400).json({ message: 'Both numbers are required' });
    return;
  }

  if (num2 === 0) {
    res.status(400).json({ message: 'Cannot divide by zero' });
    return;
  }

  const result = parseFloat(num1) / parseFloat(num2);
  res.json({ result });
});

const passport = require('passport');
require('./passport-config');

app.use(passport.initialize());

const jwt = require('jsonwebtoken');
const jwtSecret = 'your_jwt_secret';

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Example code to authenticate the user
  if (username === 'admin' && password === 'admin') {
    // User authenticated, generate a JWT token
    const token = jwt.sign({ userId: 1 }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } else {
    // Authentication failed
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  // The user is authenticated, return the protected resource
  res.json({ message: 'This is a protected resource' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

//end