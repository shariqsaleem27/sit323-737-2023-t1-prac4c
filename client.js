const jwt = require('jsonwebtoken');
const jwtSecret = 'your_jwt_secret';

function generateToken() {
  const token = jwt.sign({ userId: 1 }, jwtSecret, { expiresIn: '1h' });
  return token;
}

module.exports = {
  generateToken,
};

const axios = require('axios');
const { generateToken } = require('./jwt-utils');

const token = generateToken();

axios.get('http://localhost:3000/protected', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});