const Joi = require('joi');
const HttpStatus = require('http-status-codes');

module.exports = async (req, res) => {
    console.log(req.body);
    const schema = Joi.object().keys({
        username: Joi.string()
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
    return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.details
    })
}
};
