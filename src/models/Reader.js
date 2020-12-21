const mongoose = require("mongoose");
const Joi = require("joi");

const readerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 100,
  },
});

const Reader = mongoose.model("Reader", readerSchema);

const validateReader = (reader) => {
  const schema = Joi.object({
    name: Joi.string().required().min(4).max(100),
  });
  return schema.validate(reader);
};

module.exports = { Reader, validateReader };
