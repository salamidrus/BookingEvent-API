const Event = require('../models/event');

exports.Create = (req, res) => {
  console.log(req.decoded);
  let event = new Event({
    name: req.body.name,
    vendorId: req.decoded.sub
  });
  event
    .save()
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
