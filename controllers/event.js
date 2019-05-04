const Event = require('../models/event');
const Vendor = require('../models/vendor');
const mongoose = require('mongoose');

exports.Create = (req, res) => {
  console.log(req.decoded);
  let event = new Event({
    name: req.body.name,
    vendorId: req.decoded.id
  });
  req.body._id = new mongoose.Types.ObjectId();
  event
    .save()
    .then(data => {
      Vendor.findByIdAndUpdate(req.decoded.id, { $push: { eventId: req.body._id } })
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
  Event.find()
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

exports.GetById = (req, res) => {
  const id = req.params.id;
  Event.find({ _id: id })
    .populate('vendorId', 'id')
    .populate('vendorId', 'name')
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

exports.GetByIdVendor = (req, res) => {
  id = req.params.id;
  Event.find({ vendorId: req.params.id })
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
