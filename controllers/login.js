// import modules
const JWT = require('jsonwebtoken'),
  { JWT_SECRET } = process.env,
  bcrypt = require('bcrypt');

// import schema
const Vendor = require('../models/vendor');
const HrAccount = require('../models/hrAccount');

// Vendor Payload
signTokenVendor = user => {
  //   console.log(user);
  return JWT.sign(
    {
      iss: 'MHC',
      sub: user._id,
      email: user.email,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
      role: 'vendor'
    },
    JWT_SECRET
  );
};

// HR Account Payload
signTokenHrAccount = user => {
  return JWT.sign(
    {
      iss: 'MHC',
      sub: user.id,
      email: user.email,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
      role: 'hrAccount'
    },
    JWT_SECRET
  );
};

exports.Login = (req, res) => {
  const vendor = Vendor.findOne({ email: req.body.email });
  const hrAccount = HrAccount.findOne({ email: req.body.email });
  if (vendor) {
    vendor
      .then(user => {
        bcrypt.compare(req.body.password, user.password).then(result => {
          if (result) {
            const token = signTokenVendor(vendor);
            return res.status(200).json({
              message: 'Succesfully logged in!',
              token: token
            });
          } else {
            return res.status(400).json({
              message: 'Wrong Password'
            });
          }
        });
      })
      .catch(err => {
        res.status(400).json({ message: err.message });
      });
  } else if (hrAccount) {
    hrAccount
      .then(user => {
        bcrypt.compare(req.body.password, user.password).then(result => {
          if (result) {
            const token = signTokenHrAccount(hrAccount);
            return res.status(200).json({
              message: 'Succesfully logged in!',
              token: token
            });
          } else {
            return res.status(400).json({
              message: 'Wrong Password'
            });
          }
        });
      })
      .catch(err => {
        res.status(400).json({ message: err.message });
      });
  } else {
    return res.status(400).json({
      success: false,
      message: 'Email is not found!'
    });
  }
};
