// import modules
const mongoose = require('mongoose');

// import schema
const Booking = require('../models/booking');
const HrAccount = require('../models/hrAccount');
const Vendor = require('../models/vendor');

exports.Create = (req, res) => {
  let booking = new Booking({
    companyName: mongoose.Types.ObjectId(req.decoded.id),
    hrId: mongoose.Types.ObjectId(req.decoded.id),
    date: req.body.date,
    eventId: req.body.eventId,
    location: mongoose.Types.ObjectId(req.decoded.id)
  });
  req.body._id = new mongoose.Types.ObjectId();

  booking
    .save()
    .then(data => {
      HrAccount.findByIdAndUpdate(req.decoded.id, { $push: { bookingId: req.body._id } })
        .exec()
        .then(() => {
          res.status(200).json({
            success: true,
            data
          });
        });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        err: err.message
      });
    });
};

exports.GetAll = (req, res) => {
  Booking.find()
    .then(data => {
      res.status(200).json({
        success: true,
        data
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        err: err.message
      });
    });
};

exports.GetbyHrId = (req, res) => {
  Booking.findOne({ hrId: req.decoded.id })
    .populate({ path: 'companyName', select: 'companyName -_id' })
    .populate({ path: 'location', select: 'address.streetName address.postalCode -_id' })
    .populate({ path: 'eventId', select: 'name vendorId -_id' })
    .deepPopulate('eventId.vendorId')
    .exec()
    .then(data => {
      res.status(200).json({
        success: true,
        data
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        err: err.message
      });
    });
};

exports.GetbyVendorId = (req, res) => {
  const vendorId = mongoose.Types.ObjectId(req.decoded.id);
  Booking.findOne({ 'eventId.vendorId': vendorId })
    .then(data => {
      res.status(200).json({
        success: true,
        data
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        err: err.message
      });
    });
};
