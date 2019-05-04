const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

vendorSchema.pre('save', function(next) {
  this.email = this.email.toLowerCase();
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
// exports the model
module.exports = mongoose.model('Vendor', vendorSchema);
