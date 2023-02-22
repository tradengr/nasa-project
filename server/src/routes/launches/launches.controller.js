const { 
  getAllLaunches,
  submitLaunch,
  launchIdExists,
  abortLaunch
} = require('../../model/launches.model');

const {
  paginate
} = require('../../utilities/query');

// explicitly name function that works with req res as http functions
async function httpGetAllLaunches(req, res) {
  // returns an array of obj launch
  const { limit, skip } = paginate(req.query);
  const launches = await getAllLaunches(limit, skip)
  return res.status(200).json(launches)
}

async function httpSubmitLaunch(req, res) {
  const launch = req.body;
  if (!launch.launchDate || !launch.mission || !launch.target || !launch.rocket) {
    return res.status(400).json({
      error: 'Incomplete Launch Data'
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid Launch Date'
    })
  }
  await submitLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!await launchIdExists(launchId)) {
    return res.status(404).json({
      error: 'Launch ID not found'
    })
  } 
  const abortedLaunch = await abortLaunch(launchId);

  if (!abortedLaunch) {
    return res.json(400).json({
      err: 'Failed to Abort Launch'
    });
  }

  return res.status(200).json({
    ok: 'Abort Launch Sucess'
  });
}

module.exports = {
  httpGetAllLaunches,
  httpSubmitLaunch,
  httpAbortLaunch
}