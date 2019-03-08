const jwt = require('jsonwebtoken');
const database = require('../config/secrets');
const HttpStatus = require('http-status-codes');

module.exports = (req, res, next) => {
        const token = req.cookies.auth;
            if(!token){
                return res.status(HttpStatus.FORBIDDEN).json({success: false, message:'No token provided'});
            }

           return jwt.verify(token, database.secret, (err, decoded)=> {
               if(err){
               if(err.expiredAt < new Date()){
                   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, message:'Token is expired. Please login again', token: null});
               }
               next();
               }
               req.user = decoded.data;
               next();
           });
    };

