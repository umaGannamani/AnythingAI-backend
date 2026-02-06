const Joi = require("joi");

exports.registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(6)
    .required(),

  role: Joi.string()
    .valid("user", "admin")
    .default("user")
})
  .options({ abortEarly: false, allowUnknown: false });
