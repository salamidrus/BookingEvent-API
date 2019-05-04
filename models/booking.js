const mongoose = require('mongoose');
const { Schema } = mongoose;

// create a Schema
const bookingSchema = new Schema(
  {
    name: { type: Schema.Types.ObjectId, ref: 'Event' },
    location: { type: Schema.Types.ObjectId, ref: 'HrAccount' },
    companyName: { type: Schema.Types.ObjectId, ref: 'HrAccount' },
    hrId: { type: String, default: null },
    vendorId: { type: Schema.Types.ObjectId, ref: 'Event' },
    status: { type: String, default: 'Pending' },
    responseDate: { type: String, default: null },
    date: [{ type: Date }],
    confirmedDate: { type: Date, default: null },
    remarks: { type: String, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
