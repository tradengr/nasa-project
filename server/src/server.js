const http = require('http');

const app = require('./app');
const { loadPlanets } = require('./model/planets.model');
const { connectMongo } = require('./utilities/mongo');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);


async function startServer() {
  await connectMongo();
  await loadPlanets();

  server.listen(PORT, () => {
    console.log(`Listening on port:${PORT}`);
  });
}

startServer();