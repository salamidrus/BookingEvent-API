const mongoose = require('mongoose');
const { Schema } = mongoose;

// create a schema
const hrAccountSchema = new Schema({
  name: {
    type: [String, 'Only alphanumeric characters allowed!'],
    min: [4, 'Minimum 4 characters!'],
    max: [20, 'Maximum 20 characters!'],
    required: [true, 'Fill the name field, please!'],
    unique: [true, 'name is already exist!']
  },
  address: {
    type: [String, 'Only alphanumeric characters allowed!'],
    min: [4, 'Minimum 4 characters!'],
    max: [50, 'Maximum 50 characters!'],
    required: [true, 'Fill the address field, please!']
  },
  email: {
    type: [String, 'Only alphanumeric characters allowed!'],
    min: [4, 'Minimum 4 characters!'],
    max: [50, 'Maximum 50 characters!'],
    required: [true, 'Fill the address field, please!'],
    unique: [true, 'email is already exist!']
  },
  email: {
    type: [Number, 'Only alphanumeric characters allowed!'],
    min: [4, 'Minimum 4 characters!'],
    max: [14, 'Maximum 14 characters!'],
    required: [true, 'Fill the address field, please!'],
    unique: [true, 'email is already exist!']
  }
});

// exports the model
module.exports = mongoose.model('hrAccount', hrAccountSchema);
