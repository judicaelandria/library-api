const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  reader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reader",
  },
});

module.exports = mongoose.model("Loan", loanSchema);
