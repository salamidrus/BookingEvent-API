const Event = require('../models/event');

exports.Create = (req, res) => {
  Event.create(req.body)
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
