const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const tofirstUpper = require('../helpers/firstUpper');
const toLowerCase = require('../helpers/lowerCase');
const database = require('../config/secrets');

module.exports = async (req, res) => {
    console.log(req.body);
    const schema = Joi.object().keys({
        name: Joi.string()
            .min(5)
            .max(10)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(5)
            .required()
    });
  const { error, value } = Joi.validate(req.body, schema);

  if(error && error.details){
    return res
        .status(HttpStatus.BAD_REQUEST)
        .json({success: false, msg: error.details})
  }

const userEmail = await User.findOne({email: toLowerCase(req.body.email)});
if(userEmail){
    return res
        .status(HttpStatus.CONFLICT)
        .json({success: false, message:'Email already exist'})
}

const userName = await User.findOne({name: tofirstUpper(req.body.name)})
    if(userName){
        return res.status(HttpStatus.CONFLICT)
            .json({success: false, message:'Name already exist'})
    }

return bcrypt.hash(value.password, 10, (err, hash) =>{
    if(err){
        return res.status(HttpStatus.BAD_REQUEST)
            .json({success: false, message:'Error hashing password'})
    }

    const body = {
        name: tofirstUpper(value.name),
        email: toLowerCase(value.email),
        password: hash
    };
        User.create(body).then(user => {
        const token = jwt.sign({data: user}, database.secret, {
            expiresIn: '1h'
        });
        res.cookie('auth', token);
        res.status(HttpStatus.CREATED).json({success: true, message:'User created succeessfully', user, token})
    }).catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({success: false, message: err}));
})
};
