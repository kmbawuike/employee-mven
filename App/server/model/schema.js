const mongoose = require('mongoose')

const EquimentSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  status: String,
  description: String
},
{
  timestamps: true
});

const Equipment = mongoose.model('equipments',EquimentSchema)

module.exports = Equipment;