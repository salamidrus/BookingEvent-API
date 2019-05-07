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
      if (!data) {
        return res.status(400).json({
          success: false,
          message: 'Failed to save book'
        });
      } else {
        HrAccount.findByIdAndUpdate(req.decoded.id, { $push: { bookingId: req.body._id } })
          .exec()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'Book has been created',
              data
            });
          });
      }
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: 'Failed to save book',
        err: err.message
      });
    });
};

exports.GetAll = (req, res) => {
  Booking.find()
    .then(data => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: 'Book lists are not found'
        });
      } else {
        return res.status(200).json({
          success: true,
          message: 'Showing book lists',
          data
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: 'Cannot find Booking list in database',
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
      if (!data) {
        return res.status(400).json({
          success: false,
          message: 'Your book lists are not found'
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Showing your book lists',
          data
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: 'Cannot find specific list of events',
        err: err.message
      });
    });
};

exports.GetbyVendorId = (req, res) => {
  const vendorId = mongoose.Types.ObjectId(req.decoded.id);
  console.log(vendorId);
  Booking.find({})
    .populate('eventId')
    .then(data => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: 'Your book lists are not found'
        });
      } else if (data == null) {
        return res.status(200).json({
          success: true,
          message: "You haven't got any book"
        });
      } else {
        data.forEach(books => {
          console.log(books);
          return books.eventId.vendorId === vendorId;
        });
        return res.status(200).json({
          success: true,
          message: 'Showing your books lists',
          data
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: 'Cannot show your booking lists',
        err: err.message
      });
    });
};

exports.UpdateStatus = (req, res) => {
  Booking.findById(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'Booking id is not found'
        });
      } else {
        if (req.body.status === 'Rejected') {
          Booking.findByIdAndUpdate(
            data.id,
            { status: 'Rejected', remarks: req.body.remarks, responseDate: new Date() },
            { new: true }
          ).then(data => {
            return res.status(200).json({
              success: true,
              message: 'Booked event has been rejected',
              data
            });
          });
        } else if (req.body.status === 'Approved') {
          Booking.findByIdAndUpdate(
            data.id,
            { status: 'Approved', confirmedDate: req.body.confirmedDate, responseDate: new Date() },
            { new: true }
          ).then(data => {
            return res.status(200).json({
              success: true,
              message: 'Booked event has been approved',
              data
            });
          });
        } else {
          return res.status(404).json({
            success: false,
            message: 'Booking id is not found'
          });
        }
      }
    })
    .catch(err => {
      return res.status(500).json({
        success: false,
        message: 'Cannot find booking data',
        err: err.message
      });
    });
};
