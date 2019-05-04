const mongoose = require('mongoose');
const { Schema } = mongoose;

// create a schema
const vendorSchema = new Schema(
  {
    name: {
      type: String,
      min: 4,
      max: 20,
      required: true,
      unique: true
    },
    email: {
      type: String,
      min: 4,
      max: 50,
      required: true,
      unique: true
    },
    password: {
      type: String,
      min: 4,
      max: 50,
      required: true
    },
    eventId: [{ type: Schema.Types.ObjectId, ref: 'Event', default: null }],
    address: {
      type: String,
      min: 4,
      max: 50,
      required: true
    }
  },
  { timestamps: true }
);

// exports the model
module.exports = mongoose.model('Vendor', vendorSchema);
