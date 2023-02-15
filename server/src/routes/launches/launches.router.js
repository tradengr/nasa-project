const express = require('express');

const { httpGetAllLaunches } = require('./launches.controller.js');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);

module.exports = launchesRouter;