const mongoose = require("mongoose");
const Joi = require("joi");

const bookSchema = new mongoose.Schema({
  designation: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishingDate: {
    type: Date,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);
// not for now, need something
const validateBook = (book) => {
  const schema = Joi.object({
    designation: Joi.string().min(3).max(100).required(),
    author: Joi.string().min(3).max(100).required(),
    publishingDate: Joi.string().required(),
    available: Joi.boolean().required(),
  });
  return schema.validate(book);
};

module.exports = { Book, validateBook };
