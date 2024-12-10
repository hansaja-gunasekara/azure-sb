const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  picture: {
    type: String,
  },
});

// Create partial indexes for googleId and facebookId
userSchema.index({ googleId: 1 }, { unique: true, partialFilterExpression: { googleId: { $type: "string" } } });
userSchema.index({ facebookId: 1 }, { unique: true, partialFilterExpression: { facebookId: { $type: "string" } } });

const User = mongoose.model("User", userSchema);

function validateAdmin(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    email: Joi.string().required().min(3).max(50),
    password: Joi.string().required(),
  });

  var result = schema.validate(user);

  return result;
}

exports.User = User;
exports.validate = validateAdmin;
