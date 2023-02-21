const planets = require('./planets.mongo');

const { parse } = require('csv-parse');

const fs = require('fs');
const path = require('path');

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

// we create a promise to wait for all the data to load from the stream
function loadPlanets() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true
      }))
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          storePlanet(data);
        }
      })
      .on('error', (err) => {
        console.log(err)
        reject(err);
      })
      .on('end', async () => {
        const numOfHabitablePlanets = (await getAllPlanets()).length;
        console.log(`${numOfHabitablePlanets} habitable planets found.`);
        resolve();
      });
  });  
}

async function storePlanet(planet) {
  try {
    await planets.updateOne({
      // if this filter exists
      keplerName: planet.kepler_name,
    }, {
      // update to this value
      keplerName: planet.kepler_name,
    }, {
      // update or insert
      upsert: true,
    })
  } catch(err) {
    console.error('Failed to store Planet', (err));
  }
}

async function getAllPlanets() {
  return await planets.find({}, {
    _id: false, 
    __v: false,  
  });
}

module.exports = {
  loadPlanets,
  getAllPlanets
}
