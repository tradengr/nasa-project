const { Schema, model } = require('mongoose');

const launchesSchema = new Schema({
  flightNumber: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  customers: {
    type: [ String ],
    required: true,
  },
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  }
});

// creates the Launch model to use the launchesSchema to map to the launches collection
module.exports = model('Launch', launchesSchema);