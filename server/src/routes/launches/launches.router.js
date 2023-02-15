const express = require('express');

const { 
  httpGetAllLaunches,
  httpSubmitLaunch 
} = require('./launches.controller.js');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpSubmitLaunch)

module.exports = launchesRouter;