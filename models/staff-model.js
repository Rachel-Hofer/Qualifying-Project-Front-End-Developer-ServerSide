const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  phoneNumber: String,
  color: String,
  birthday: String,
  email: String,
  file: String
},
  {
    timestamps: true
  });

const Staff = mongoose.model('User', staffSchema);
module.exports = Staff;