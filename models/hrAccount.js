const mongoose = require('mongoose');
const { Schema } = mongoose;

// create a schema
const hrAccountSchema = new Schema({
  name: {
    type: [String, 'Only alphanumeric characters allowed'],
    min: [4, 'Minimum 4 characters'],
    max: [20, 'Maximum 20 characters'],
    required: [true, 'Fill the name field, please'],
    unique: [true, 'name is already exist']
  },
  email: {
    type: [String, 'Only alphanumeric characters allowed'],
    min: [4, 'Minimum 4 characters'],
    max: [50, 'Maximum 50 characters'],
    required: [true, 'Fill the address field, please'],
    unique: [true, 'email is already exist']
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
  address: {
    city: {
      type: [String, 'Only alphanumeric characters allowed'],
      min: [4, 'Minimum 4 characters'],
      max: [20, 'Maximum 20 characters'],
      required: [true, 'Fill the City field, please']
    },
    streetName: {
      type: [String, 'Only alphanumeric characters allowed'],
      min: [4, 'Minimum 4 characters'],
      max: [50, 'Maximum 50 characters'],
      required: [true, 'Fill the Streetname field, please']
    },
    postalCode: {
      type: [Number, 'Only number characters allowed'],
      min: [4, 'Minimum 4 characters'],
      max: [50, 'Maximum 50 characters'],
      required: [true, 'Fill the postal code field, please']
    }
  },
  phone: {
    type: [Number, 'Only alphanumeric characters allowed'],
    min: [4, 'Minimum 4 characters'],
    max: [14, 'Maximum 14 characters'],
    required: [true, 'Fill the address field, please'],
    unique: [true, 'Phone number is already exist']
  },
  bookingId: [{type: Schema.Types.ObjectId, ref: 'Booking'}]
},
{timestamps: true}),
;

// exports the model
module.exports = mongoose.model('HrAccount', hrAccountSchema);
