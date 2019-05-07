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
      max: 20,
      required: true,
      unique: true,
      match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    },
    password: {
      type: String,
      min: 4,
      max: 20,
      required: true
    },
    eventId: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    address: {
      type: String,
      min: 4,
      max: 50,
      required: true
    }
  },
  { timestamps: true }
);

// hash password
vendorSchema.pre('save', function(next) {
  this.email = this.email.toLowerCase();
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
// exports the model
module.exports = mongoose.model('Vendor', vendorSchema);
