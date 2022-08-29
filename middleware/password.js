const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(10) // Minimum length 10
  .is()
  .max(50) // Maximum length 50
  .has()
  .uppercase() // Must have at least 1 uppercase letter
  .has()
  .lowercase() // Must have at least 1 lowercase letter
  .has()
  .digits() // Must have at least 1 digit
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123", "Azerty123"]); // Blacklist these values

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res.status(400).json({
      error:
        "Le mot de passe n'est pas assez fort. " +
        passwordSchema.validate(req.body.password, {
          list: true,
        }),
    });
  }
};
