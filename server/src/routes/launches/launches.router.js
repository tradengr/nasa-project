const express = require('express');

const { 
  httpGetAllLaunches,
  httpSubmitLaunch,
  httpAbortLaunch 
} = require('./launches.controller.js');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpSubmitLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter;