const HttpStatus = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const tofirstUpper = require('../helpers/firstUpper');
const database = require('../config/secrets');

module.exports = async (req, res) => {
  if(!req.body.name || !req.body.password){
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, message:'No empty fields allowed'});
  }
  await User.findOne({name: tofirstUpper(req.body.name)}).then(user =>{
      if(!user){
          return res.status(HttpStatus.NOT_FOUND).json({success: false, message:'User name not found'});
      }
      return bcrypt.compare(req.body.password, user.password).then(result =>{
          if(!result){
              return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, message:'Password is incorect'});
          }
          const token = jwt.sign({data: user}, database.secret, {
              expiresIn: '1h'
          });
          res.cookie('auth', token);
          return res.status(HttpStatus.OK).json({success: true, message:'Login ssuccessful!', user, token});
      })
    }).catch(err =>{
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, message:'Error occured'});
  });

};
