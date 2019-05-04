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
      id: user._id,
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
      id: user.id,
      email: user.email,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
      role: 'hrAccount'
    },
    JWT_SECRET
  );
};

exports.Login = async (req, res) => {
  console.log(req.body);
  const vendor = await Vendor.findOne({ email: req.body.email });
  const hrAccount = await HrAccount.findOne({ email: req.body.email });
  console.log(hrAccount);
  if (vendor) {
    bcrypt.compare(req.body.password, vendor.password).then(result => {
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
  } else if (hrAccount) {
    bcrypt.compare(req.body.password, hrAccount.password).then(result => {
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
  } else {
    return res.status(400).json({
      success: false,
      message: 'Email is not found!'
    });
  }
};
