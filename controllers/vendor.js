// import schema
const Vendor = require('../models/vendor');

exports.Create = (req, res) => {
  Vendor.create(req.body)
    .then(data => {
      res.status(200).json({
        success: true,
        message: 'Account created',
        data
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        err: err.message || 'Cannot create vendor account'
      });
    });
};
