const app = require('../../app');
const { connectMongo } = require('../../utilities/mongo');
const request = require('supertest');

const completeLaunchData = {
  launchDate: new Date('January 5, 2025'),
  mission: 'Mission Possible',
  rocket: 'Explorer IS1',
  target: 'Kepler-442 b',
}

const launchDataWithoutDate = {
  mission: 'Mission Possible',
  rocket: 'Explorer IS1',
  target: 'Kepler-442 b',
}

const launchDataWithInvalidDate = {
  launchDate: 'gobbledygook',
  mission: 'Mission Possible',
  rocket: 'Explorer IS1',
  target: 'Kepler-442 b',
}

const LAUNCHES_URI = '/v1/launches';

describe('API TEST', () => {
  beforeAll(async () => {
    await connectMongo();
    await loadPlanets();
  })
  
  describe('Test GET /launches', () => {
    // TEST CASE    
    test('Respond with 200 SUCCESS', async () => {
      const response = await request(app)
        .get(LAUNCHES_URI)
        .expect(200)
        .expect('Content-Type', /json/)
    });
  });
  
  describe('Test POST /launches', () => {
    test('Respond with 201 CREATED', async () => {
      const response = await request(app)
        .post(LAUNCHES_URI)
        .send({
          launchDate: new Date('January 5, 2025'),
          mission: 'Mission Possible',
          rocket: 'Explorer IS1',
          target: 'Kepler-442 b',
        })
        .expect('Content-Type', /json/)
        .expect(201)
        
      const launchDateReq = new Date(completeLaunchData.launchDate).valueOf();
      const launchDateRes = new Date(response.body.launchDate).valueOf();
      
      expect(launchDateRes).toBe(launchDateReq);
      expect(completeLaunchData).toMatchObject(launchDataWithoutDate);
    })
    
    test('Catch missing required properties', async () => {
      const response = await request(app)
        .post(LAUNCHES_URI)
        .send(launchDataWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400);
  
      expect(response.body).toStrictEqual({
        error: 'Incomplete Launch Data'
      })
    })
    test('Catch invalid Dates', async () => {
      const response = await request(app)
        .post(LAUNCHES_URI)
        .send(launchDataWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400)
  
      expect(response.body).toStrictEqual({
        error: 'Invalid Launch Date'
      })
    })
  });
})
// CREATES A BLOCK THAT GROUPS TOGETHER SEVERAL RELATED TEST