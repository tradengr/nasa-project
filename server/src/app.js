// from npm registry
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// from node modules
const path = require('path');
// local modules
const api_v1 = require('./routes/api_v1');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

app.use('/v1', api_v1);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

module.exports = app;