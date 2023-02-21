const launchesModel = require('./launches.mongo');
const planetsModel = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 1;

const launch = {
  flightNumber: 1,
  launchDate: new Date('January 5, 2025'),
  mission: 'Mission Possible',
  rocket: 'Explorer IS1',
  target: 'Kepler-442 b',
  customers: ['NASA', 'SPACE-X'],
  upcoming: true,
  success: true
}

createLaunch(launch);

// query to select all from launches collection
async function getAllLaunches() {
  return await launchesModel
    .find({}, {
      _id: false,
      __v: false,
    });
}
// updates the launches collection with new launch document 
async function createLaunch(launch) {
  // filter via the planet name ( WHERE keplerName = )
  const planet = await planetsModel.findOne({
    keplerName: launch.target,
  })

  // checks if the target planet is existing in planets collection
  if (!planet) {
    throw new Error('Target Planet Not Found.')
  }

  // checks if flightnum is existing and if not insert new launch document
  await launchesModel.findOneAndUpdate({
    flightNumber: launch.flightNumber
  }, launch, {
    upsert: true
  });
}

// selects the latest flight number
async function getLatestFlightNumber() {
  const latestLaunch = await launchesModel
    .findOne()
    .sort({
      flightNumber: -1
    });
  // to handle if incase no launches are registered yet
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return Number(latestLaunch.flightNumber);
}

// NOTE: the launch argument here comes from the request
async function submitLaunch(launch) {
  const latestFlightNumber = await getLatestFlightNumber() + 1;

  const completeLaunchInfo = Object.assign(launch, {
    flightNumber: latestFlightNumber,
    customers: ['NASA', 'SPACE-X'],
    upcoming: true,
    success: true,
  })

  return await createLaunch(completeLaunchInfo);
}

// function submitLaunch(launch) {
//   updatedFlightNumber++;
//   launches.set(updatedFlightNumber, Object.assign(launch, {
//     flightNumber: updatedFlightNumber,
//     customers: ['NASA', 'SPACE-X'],
//     upcoming: true,
//     success: true
//   }));
// }

function launchIdExists(id) {
  return launches.has(id);
}

function abortLaunch(id) {
  const abortedLaunch = launches.get(id);
  abortedLaunch.upcoming = false;
  abortedLaunch.success = false;
  return abortedLaunch;
}


module.exports = { 
  getAllLaunches,
  submitLaunch,
  launchIdExists,
  abortLaunch
};