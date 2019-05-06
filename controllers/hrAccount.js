// import schema
const HrAccount = require('../models/hrAccount');

exports.Create = (req, res) => {
  HrAccount.create(req.body)
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
        message: 'Cannot create HR account',
        err: err.message
      });
    });
};
