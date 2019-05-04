const mongoose = require('mongoose');
const { Schema } = mongoose;

// create a Schema
const eventSchema = new Schema(
  {
    name: {
      type: String,
      min: 4,
      max: 20,
      required: true
    },
    vendorId: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
