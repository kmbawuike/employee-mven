const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  username: String,
  password: String
})

const Employee = mongoose.model('user', EmployeeSchema)

module.exports = Employee
 