const { 
  getAllLaunches,
  submitLaunch
} = require('../../model/launches.model');

// explicitly name function that works with req res as http functions
function httpGetAllLaunches(req, res) {
  // returns an array of obj launch
  return res.status(200).json(getAllLaunches())
}

function httpSubmitLaunch(req, res) {
  const launch = req.body;
  if (!launch.launchDate || !launch.mission || !launch.target || !launch.rocket) {
    return res.status(400).json('Incomplete Launch Data');
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json('Invalid Launch Date')
  }
  submitLaunch(launch);
  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpSubmitLaunch
}