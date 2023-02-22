const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function connectMongo() {
  await mongoose.set('strictQuery', false);
  await mongoose.connect(MONGO_URL);
}

module.exports = {
  connectMongo
}