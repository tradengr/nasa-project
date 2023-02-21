const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://nasa-api:FaA9t168LfhdSNbG@nasacluster.6kkfmz5.mongodb.net/nasa?retryWrites=true&w=majority';

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