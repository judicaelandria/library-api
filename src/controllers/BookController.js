const { validateBook, Book } = require("../models/Book");

class BookController {
  /**
   * @route POST /api/book/createBook
   */
  createBook = async (req, res) => {
    const { designation, author, publishingDate, available } = req.body;
    const url = req.protocol + "://" + req.get("host");
    const imageUrl = url + "/uploads/" + req.file.filename;
    const book = new Book({
      designation: designation,
      author: author,
      publishingDate: publishingDate,
      available: available,
      image: imageUrl,
    });
    try {
      const newBook = await book.save();
      res.status(201).send(newBook);
    } catch (err) {
      res.status(404).send("Something went wrong");
      console.log({ err });
    }
  };
  /**
   * @route PUT /api/book/updateBook/:id
   * @param {number} id
   */
  updateBook = async (req, res) => {
    const { id } = req.params;
    const { designation, author, publishingDate, available } = req.body;
    const url = req.protocol + "://" + req.get("host");
    const isFile = !!req.file;
    const imageUrl = isFile && url + "/uploads/" + req.file.filename;
    try {
      const foundBook = await Book.findById(id);
      if (!foundBook) {
        res.status(404).send("cannot find the book");
      } else {
        designation
          ? (foundBook.designation = designation)
          : (foundBook.designation = foundBook.designation);
        author
          ? (foundBook.author = author)
          : (foundBook.author = foundBook.author);
        publishingDate
          ? (foundBook.publishingDate = publishingDate)
          : (foundBook.publishingDate = foundBook.publishingDate);
        available
          ? (foundBook.available = available)
          : (foundBook.available = foundBook.available);
        imageUrl
          ? (foundBook.image = imageUrl)
          : (foundBook.image = foundBook.image);
      }
      await foundBook.save();
      res.status(200).send("updated");
    } catch (err) {
      res.status(404).send("Something went wrong");
      console.log("update book error", err);
    }
  };
  /**
   * @route DELETE /api/book/deleteBook
   * @param {number} id
   */
  deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
      const found = await Book.findByIdAndDelete(id);
      if (!found) res.send("Cannot delete the book");
      res.send("Book deleted with access");
    } catch (err) {
      res.status(404).send("Something went wrong");
    }
  };
  /**
   * @route GET /api/book/fetchAll
   */
  fetchAll = async (_, res) => {
    try {
      const books = await Book.find();
      res.status(200).send(books);
    } catch (err) {
      res.status(404).send("Something went wrong");
    }
  };
  /**
   * @route GET /api/book/:id
   * @param {number} id
   */
  book = async (req, res) => {
    const { id } = req.params;
    try {
      const book = await Book.findOne({ _id: id });
      if (!book) res.status(404).send("Cannot find the book");
      res.status(200).send(book);
    } catch (err) {
      res.status(404).send("Something went wrong");
      console.log(err);
    }
  };
}

module.exports.BookController = BookController;
