const { validateReader, Reader } = require("../models/Reader");

class ReaderController {
  /**
   * @route POST /api/reader/createReader
   */
  createReader = async (req, res) => {
    const { error, value } = validateReader(req.body);
    if (error) {
      res.send(400).send({ error: error.details[0].message });
    } else {
      const reader = new Reader({
        name: value.name,
      });
      try {
        const newReader = await reader.save();
        res.status(201).send({ data: newReader });
      } catch (err) {
        res.status(404).send("Something went wrong");
      }
    }
  };
  /**
   * @route PATCH /api/reader/updateReader
   * @param {number} id
   */
  updateReader = async (req, res) => {
    const { id } = req.params;
    const { error, value } = validateReader(req.body);
    if (error) {
      res.send(400).send({ error: error.details[0].message });
    } else {
      try {
        const foundReader = await Reader.findOne(id);
        if (!foundReader)
          res.status(400).send("Cannot update the given reader");
        foundReader.name = value.name || foundReader.name;
        const reader = await foundReader.update();
        res.status(200).send({
          data: reader,
          message: "update successful",
        });
      } catch (err) {
        res.status(404).send("Something went wrong");
      }
    }
  };
  /**
   * @route DELETE /api/reader/deleteReader
   * @param {number} id
   */
  deleteReader = async (req, res) => {
    const { id } = req.params;
    try {
      const foundReader = await Reader.findByIdAndDelete(id);
      if (!foundReader) res.status(400).send("Could not delete the reader");
      res.status(200).send("Deleted");
    } catch (err) {
      res.status(404).send("Something went wrong");
    }
  };
  /**
   * @route GET /api/reader/fetchAll
   */
  fetchAll = async (_, res) => {
    try {
      const readers = await Reader.find();
      res.status(200).send({ readers });
    } catch (err) {
      res.status(404).send("Something went wrong");
    }
  };
  /**
   * @route GET /api/reader
   * @param {number} id
   */
  reader = async (req, res) => {
    const { id } = req.params;
    try {
      const foundReader = await Reader.findOne(id);
      if (!foundReader) res.status(404).send("Cannot find the reader");
      res.status(200).send({ reader });
    } catch (err) {
      res.status(404).send("Something went wrong");
    }
  };
}

module.exports.ReaderController = ReaderController;
