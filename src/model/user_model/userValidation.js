const Joi = require('joi')
const userSignupValidator = (req, res, next) => {
    const schema = Joi.object({
        full_name: Joi.string().required().error(new Error("Enter full name")),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } }).required().error(new Error("Enter a valid email")),
        password: Joi.string().required().error(new Error("Password is required")),
        profile_image: Joi.string().allow('').error(new Error("Upload a proper profile_picture")),
        kyc_documents: Joi.array().length(2).required(),
        gender: Joi.string().required().error(new Error("Enter gender")),
        date_of_birth: Joi.date()
    });
    const { error, value } = schema.validate(req.body);
    if (error == undefined) {
        next();
    } else {
        return res.send(error)
    }
};

module.exports = {
    userSignupValidator
}