const { getAllLaunches } = require('../../model/launches.model');

// explicitly name function that works with req res as http functions
function httpGetAllLaunches(req, res) {
  // returns an array of obj launch
  return res.status(200).json(getAllLaunches())
}

module.exports = {
  httpGetAllLaunches
}