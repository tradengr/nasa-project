const axios = require('axios');

const launchesModel = require('./launches.mongo');
const planetsModel = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 1;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

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
// checks if the flightID exists returns an launch obj
async function launchIdExists(id) {
  // return launches.has(id);
  return await launchesModel.findOne({
    flightNumber: id,
  });
}
// creates query to spacex api 
// creates launch document on each launch obj
async function populateLaunches() {
  const request = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1
          }
        },
        {
          path: 'payloads',
          select: {
            customers: 1
          }
        }
      ]
    }
  });

  if (request.status !== 200) {
    console.error('Failed to fetch Launches');
    throw new Error('Failed to fetch Launches');
  }

  // launchesdocs
  const launchesDocs = request.data.docs;

  for (const launchesDoc of launchesDocs) {
    const payloads = launchesDoc['payloads'];
    const customers = payloads.flatMap((payload) => {
      return payload['customers'];
    });

    const launch = {
      flightNumber: launchesDoc['flight_number'],
      launchDate: launchesDoc['date_local'],
      mission: launchesDoc['name'],
      rocket: launchesDoc['rocket']['name'],
      upcoming: launchesDoc['upcoming'],
      success: launchesDoc['success'],
      customers
    }

    console.log(`${launch.flightNumber} ${launch.mission}`);

    // TODO: populate launches
    await createLaunch(launch);
  }
}
// checks if the data is available in our database
// fetches the data if not
async function loadLaunches() {
  const launchStored = await launchesModel.findOne({
    flightNumber: 1,
    mission: 'FalconSat',
    rocket: 'Falcon 1'
  });

  if (launchStored) {
    console.log('Launches stored in Database');
    return;
  } else {
    return await populateLaunches();
  }
}


// SELECT * FROM launches;
async function getAllLaunches(limit, skip) {
  return await launchesModel
    .find({}, {
      _id: false,
      __v: false,
    })
    .sort({ flightNumber: 'asc' })
    .limit(limit)
    .skip(skip)
}
// INSERT INTO launches (launch) VALUES (launchvalues);
async function createLaunch(launch) {
   // checks if flightnum is existing and if not insert new launch document
  await launchesModel.findOneAndUpdate({
    flightNumber: launch.flightNumber
  }, launch, {
    upsert: true
  });
}
// NOTE: the launch argument here comes from the request
async function submitLaunch(launch) {
  // filter via the planet name ( WHERE keplerName = )
  const planet = await planetsModel.findOne({
    keplerName: launch.target,
  })
  // checks if the target planet is existing in planets collection
  if (!planet) {
    throw new Error('Target Planet Not Found.')
  }

  const latestFlightNumber = await getLatestFlightNumber() + 1;

  const completeLaunchInfo = Object.assign(launch, {
    flightNumber: latestFlightNumber,
    customers: ['NASA', 'SPACE-X'],
    upcoming: true,
    success: true,
  })

  return await createLaunch(completeLaunchInfo);
}
// UPDATE launches SET upcoming, success = false WHERE flightNumber = id;
async function abortLaunch(id) {
  const aborted = await launchesModel.updateOne({
    flightNumber: id,
  }, {
    upcoming: false,
    success: false,
  });

  return aborted.acknowledged === true && aborted.modifiedCount === 1;
}


module.exports = { 
  launchIdExists,
  loadLaunches,
  getAllLaunches,
  submitLaunch,
  abortLaunch
};