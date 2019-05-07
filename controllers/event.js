// import schema
const Event = require('../models/event');
const Vendor = require('../models/vendor');
const mongoose = require('mongoose');

exports.Create = (req, res) => {
  let event = new Event({
    name: req.body.name,
    vendorId: req.decoded.id
  });
  req.body._id = new mongoose.Types.ObjectId();
  event
    .save()
    .then(data => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: 'Failed to create event'
        });
      } else {
        Vendor.findByIdAndUpdate(req.decoded.id, { $push: { eventId: req.body._id } })
          .exec()
          .then(() => {
            return res.status(200).json({
              success: true,
              data
            });
          });
      }
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: 'Failed to create event',
        err: err.message
      });
    });
};

exports.GetAll = (req, res) => {
  Event.find()
    .then(data => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: 'Events are not found'
        });
      } else {
        return res.status(200).json({
          success: true,
          message: 'Showing Event lists',
          data
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: 'Cannot find Event',
        err: err.message
      });
    });
};

exports.GetById = (req, res) => {
  const id = req.params.id;
  Event.find({ _id: id })
    .populate('vendorId', 'id')
    .populate('vendorId', 'name')
    .exec()
    .then(data => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: 'Events are not found'
        });
      } else {
        return res.status(200).json({
          success: true,
          message: 'Showing event lists',
          data
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: 'Cannot find event in database',
        err: err.message
      });
    });
};

exports.GetByIdVendor = (req, res) => {
  const id = mongoose.Types.ObjectId(req.decoded.id);
  Event.findOne({ vendorId: id })
    .exec()
    .then(data => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: 'Events are not found'
        });
      }
      return res.status(200).json({
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

exports.Delete = (req, res) => {
  const vendorId = mongoose.Types.ObjectId(req.decoded.id);
  const eventId = req.params.id;

  Event.findOne({ vendorId: vendorId })
    .then(vendor => {
      if (!vendor) {
        return res.status(400).json({
          success: false,
          message: "You haven't created any event"
        });
      } else {
        Event.findOneAndDelete({ _id: eventId })
          .then(data => {
            if (!data) {
              return res.status(400).json({
                success: false,
                message: 'Event is not found'
              });
            } else {
              return res.status(200).json({
                success: true,
                message: 'Event successfully deleted!',
                data
              });
            }
          })
          .catch(err => {
            res.status(400).json({
              success: false,
              message: 'Event is not found',
              err: err.message
            });
          });
      }
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: 'Vendor is not registered',
        err: err.message
      });
    });
};

exports.showGroupedEvents = (req, res) => {
  Event.find({})
    .populate('vendorId', 'name')
    .exec()
    .then(Events => {
      let result = [];
      let resultMap = new Map();

      for (let obj of Events) {
        if (!resultMap.has(obj.name)) {
          resultMap.set(obj.name, [{ eventId: obj.id, vendorId: obj.vendorId }]);
        } else {
          let vendors = resultMap.get(obj.name);
          vendors.push({ eventId: obj.id, vendorId: obj.vendorId });
          resultMap.set(obj.name, vendors);
        }
      }
      const mapping = (value, key, map) => {
        result.push({
          name: key,
          vendors: value
        });
      };
      resultMap.forEach(mapping);

      if (Events.length === 0) {
        res.status(404).json({
          success: false,
          message: 'Event not found'
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Show all event',
          data: result
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: 'Cannot show event',
        err: err.message
      });
    });
};
