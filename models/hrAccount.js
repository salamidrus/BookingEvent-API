const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;

// create a schema
const hrAccountSchema = new Schema(
  {
    companyName: {
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
      unique: true
    },
    password: {
      type: String,
      min: 4,
      max: 20,
      required: true
    },
    address: {
      city: {
        type: String,
        min: 4,
        max: 20,
        required: true
      },
      streetName: {
        type: String,
        min: 4,
        max: 50,
        required: true
      },
      postalCode: {
        type: String,
        min: 4,
        max: 15,
        required: true,
        match: /^[0-9]*$/
      }
    },
    phone: {
      type: String,
      required: true,
      min: 4,
      max: 15,
      unique: true,
      match: /^[0-9]*$/
    },
    bookingId: [{ type: Schema.Types.ObjectId, ref: 'Booking', default: null }]
  },
  { timestamps: true }
);

// hash password
hrAccountSchema.pre('save', function(next) {
  this.email = this.email.toLowerCase();
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

// exports the model
module.exports = mongoose.model('HrAccount', hrAccountSchema);
