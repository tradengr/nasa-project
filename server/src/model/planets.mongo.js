const { Schema, model } = require('mongoose');

const planetsSchema = new Schema({
  keplerName: {
    type: String,
    required: true,
  }
});
// the Planet model uses the planetsSchema and then maps to planets Collection
module.exports = model('Planet', planetsSchema);