const Joi = require('joi');

// Validation schema for user registration
const registerValidationSchema = Joi.object({
  name: Joi.string().required().messages({"string.required":"Please enter a name!"}),
  email: Joi.string().email().required().messages({"string.email": "Please enter a valid email!", "string.required":"Please enter an email!"}),
  password: Joi.string().required().min(8).messages({"stirng.required":"Please enter a password!", "string.min":"Please enter a minimum password length of 8!"}),
});

// Validation schema for user login
const loginValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({"string.email": "Please enter a valid email!", "string.required":"Please enter an email!"}),
  password: Joi.string().required().min(8).messages({"stirng.required":"Please enter a password!", "string.min":"Please enter a minimum password length of 8!"}),
});

const changePasswordValidationSchema = Joi.object({
    password: Joi.string().required().min(8).messages({"stirng.required":"Please enter a password!", "string.min":"Please enter a minimum password length of 8!"}),
    newPassword: Joi.string().required().min(8).messages({"stirng.required":"Please enter a new password!", "string.min":"Please enter a minimum password length of 8!"}),

});

const resetPasswordValidationSchema = Joi.object({
    newPassword: Joi.string().required().min(8).messages({"stirng.required":"Please enter a new password!", "string.min":"Please enter a minimum password length of 8!"}),
});

const emailValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({"string.email": "Please enter a valid email!", "string.required":"Please enter an email!"}),
})

// Function to validate user registration input
const validateRegisterInput = (data) => {
  return registerValidationSchema.validate(data);
};

// Function to validate user login input
const validateLoginInput = (data) => {
  return loginValidationSchema.validate(data);
};

const validateEmail = (data)=>{
    return emailValidationSchema.validate(data);
}

const validateResetPassword = (data) =>{
    return resetPasswordValidationSchema.validate(data);
}

const validateChangePassword = (data) =>{
    return changePasswordValidationSchema.validate(data);

}

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateEmail,
  validateChangePassword,
  validateResetPassword
};
