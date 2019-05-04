const mongoose = require('mongoose');
const { Schema } = mongoose;

// create a schema
const vendorSchema = new Schema(
  {
    name: {
      type: [String, 'Only alphanumeric characters allowed!'],
      min: [4, 'Minimum 4 characters!'],
      max: [20, 'Maximum 20 characters!'],
      required: [true, 'Fill the name field, please!'],
      unique: [true, 'Name is already exist!']
    },
    email: {
      type: [String, 'Only alphanumeric characters allowed!'],
      min: [4, 'Minimum 4 characters!'],
      max: [50, 'Maximum 50 characters!'],
      required: [true, 'Fill the address field, please!'],
      unique: [true, 'Email is already exist!']
    },
    password: {
      type: [String, 'Only alphanumeric characters allowed'],
      min: [4, 'Minimum 4 characters'],
      max: [50, 'Maximum 50 characters'],
      required: [true, 'Fill the address field, please'],
      match: [
        [/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/],
        'Password Minimum eight characters, at least one letter and one number'
      ]
    },
    eventId: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    address: {
      type: [String, 'Only alphanumeric characters allowed!'],
      min: [4, 'Minimum 4 characters!'],
      max: [50, 'Maximum 50 characters!'],
      required: [true, 'Fill the address field, please!']
    }
  },
  { timestamps: true }
);

// exports the model
module.exports = mongoose.model('Vendor', vendorSchema);
