require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');

const jwtEvaluation = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

const createToken = ({ id, name, email, role }) => {
  const token = jwt.sign({ id, name, email, role }, jwtEvaluation);
  return token;
}; 

const verifyToken = (token) => {
  const user = jwt.verify(token, jwtEvaluation);
  return user;
};

module.exports = { createToken, verifyToken };