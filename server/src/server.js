// imports the http module native in node.js
const http = require('http');
// imports the app from app module that we made from express
const app = require('./app');

const { loadPlanets } = require('./model/planets.model');
// setting the port to the environment variable or defaults to 8000
const PORT = process.env.PORT || 8000;
// creates a http server
// the express app becomes the request listener
const server = http.createServer(app);

// our created server listens on PORT
async function startServer() {
  await loadPlanets();
  server.listen(PORT, () => {
    console.log(`Listening on port:${PORT}`);
  });
}

startServer();