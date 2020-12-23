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
   * @route PATCH /api/book/updateBook/:id
   * @param {number} id
   */
  updateBook = async (req, res) => {
    const { error, value } = validateBook(req.body);
    const { id } = req.params;
    if (error) {
      res.status(403).send({ error: error.details[0].message });
    } else {
      try {
        const foundBook = await Book.findOne(id);
        if (!foundBook) res.status(404).send("Cannot find the book");
        foundBook.designation = value.designation;
        foundBook.author = value.author;
        foundBook.publishingData = value.publishingData;
        foundBook.available = value.available;
        const book = await foundBook.update();
        res.status(201).send({
          data: book,
          message: "Successfully updated",
        });
      } catch (err) {
        res.status(404).send("Something went wrong");
      }
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
      const book = await Book.findOne(id);
      if (!book) res.status(404).send("Cannot find the book");
      res.status(200).send(book);
    } catch (err) {
      res.status(404).send("Something went wrong");
    }
  };
}

module.exports.BookController = BookController;
