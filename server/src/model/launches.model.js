// creates a map which is a 
const launches = new Map();

const launch = {
  flightNumber: 69,
  launchDate: new Date('January 5, 2025'),
  mission: 'Mission Possible',
  rocket: 'Explorer IS1',
  destination: 'Kepler-442 b',
  customer: ['NASA', 'SPACE-X'],
  upcoming: true,
  success: true
}

// set the launches map with the key = 69 and value = launch obj 
// (launches = {69: launch})
launches.set(launch.flightNumber, launch);

module.exports = launches;