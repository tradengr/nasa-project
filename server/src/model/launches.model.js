const launches = new Map();

const launch = {
  launchNumber: 69,
  launchDate: new Date('January 5, 2025'),
  missionName: 'Mission Possible',
  rocketType: 'Explorer IS1',
  destinationPlanet: 'Kepler-442 b',
  customer: 'NASA',
  upcoming: true,
  success: true
}

launches.set(launch.launchNumber, launch);

module.exports = launches;