const Loan = require("../models/Loan");

class LoanController {
  /**
   * @route POST /api/loan/createLoan
   */
  createLoan = async (req, res) => {
    const { book, reader } = req.body;
    try {
      const foundLoan = await Loan.findOne({ book });
      if (foundLoan)
        res.status(400).send("This book is already loan by a reader");
      const newLoan = new Loan({
        book,
        reader,
      });
      const loan = await newLoan.save();
      res.status(201).send({ loan });
    } catch (err) {
      res.status(404).send("Something went wrong");
    }
  };
  /**
   * @route PATCH /api/loan/updateLoan
   * @param {number} id
   */
  updateLoan = async (req, res) => {
    const { id } = req.params;
    const { book, reader } = req.body;
    try {
      const foundLoan = await Loan.findOne(id);
      if (!foundLoan) res.status(404).send("Can not find the loan");
      foundLoan.book = book || foundLoan.book;
      foundLoan.reader = reader || foundLoan.reader;
      const updatedLoan = await foundLoan.save();
      res.status(200).send("Update successful");
    } catch (err) {
      res.status(404).send("Something went wrong");
    }
  };
  /**
   * @route DELETE /api/loan/deleteLoan
   * @param {number} id
   */
  deleteLoan = async (req, res) => {
    const { id } = req.params;
    try {
      const loan = await Loan.findByIdAndDelete(id);
      if (!loan) res.status(400).send("Can't delete the loan");
      res.status(200).send("deleted");
    } catch (err) {
      res.status(404).send("Something went wrong");
    }
  };
  /**
   * @route GET /api/loan/fetchAll
   */
  fetchAll = async (req, res) => {
    try {
      const loans = await Loan.find()
        .populate("book", "designation author")
        .populate("reader", "name");
      console.log(loans);
      res.status(200).send({ data: loans });
    } catch (err) {
      res.status(404).send("Something went wrong");
      console.error({ err });
    }
  };
  /**
   * @route GET /api/loan/:id
   * @param {number} id
   */
  loan = async (req, res) => {
    const { id } = req.params;
    try {
      const loan = await Loan.findOne({ _id: id })
        .populate("book", "designation author publishingDate available")
        .populate("reader", "name");
      if (!loan) {
        res.status(400).send("Can't find the loan");
      } else {
        res.status(200).send({ data: loan });
      }
    } catch (err) {
      res.status(404).send("Something went wrong");
    }
  };
}

module.exports.LoanController = LoanController;
