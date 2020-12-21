const { Router } = require("express");
const { ReaderController } = require("../controllers/ReaderController");

const router = Router();
const readerController = new ReaderController();

router.get("/fetchAll", readerController.fetchAll);
router.get("/:id", readerController.reader);
router.post("/createReader", readerController.createReader);
router.patch("/updateReader/:id", readerController.updateReader);
router.delete("/deleteReader/:id", readerController.deleteReader);

module.exports = router;
