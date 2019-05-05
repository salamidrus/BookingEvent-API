const mongoose = require('mongoose');
const { Schema } = mongoose;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

// create a Schema
const bookingSchema = new Schema(
  {
    name: { type: Schema.Types.ObjectId, ref: 'Event' },
    location: { type: Schema.Types.ObjectId, ref: 'HrAccount' },
    companyName: { type: Schema.Types.ObjectId, ref: 'HrAccount' },
    hrId: { type: Schema.Types.ObjectId, ref: 'HrAccount' },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
    status: { type: String, enum: ['Approved', 'Pending', 'Rejected'], default: 'Pending' },
    responseDate: { type: String, default: null },
    date: [{ type: Date }],
    confirmedDate: { type: Date, default: null },
    remarks: { type: String, default: null }
  },
  { timestamps: true }
);

bookingSchema.plugin(deepPopulate, {
  populate: {
    'eventId.vendorId': {
      select: 'name email address'
    }
  }
});
module.exports = mongoose.model('Booking', bookingSchema);
