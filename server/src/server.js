const http = require('http');

const mongoose = require('mongoose');

const app = require('./app');
const { loadPlanets } = require('./model/planets.model');

const PORT = process.env.PORT || 8000;
const MONGO_URL = 'mongodb+srv://nasa-api:FaA9t168LfhdSNbG@nasacluster.6kkfmz5.mongodb.net/nasa?retryWrites=true&w=majority';

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function startServer() {
  mongoose.set('strictQuery', false);
  await mongoose.connect(MONGO_URL);

  await loadPlanets();

  server.listen(PORT, () => {
    console.log(`Listening on port:${PORT}`);
  });
}

startServer();