const mongoose = require('mongoose');
const { Schema } = mongoose;

// create a Schema
const eventSchema = new Schema(
  {
    name: {
      type: [String, 'Only alphanumeric characters allowed'],
      min: [4, 'Minimum 4 characters'],
      max: [20, 'Maximum 20 characters'],
      required: [true, 'Fill the name field, please']
    },
    vendorId: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
