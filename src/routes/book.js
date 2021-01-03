const { Router } = require("express");
const { BookController } = require("../controllers/BookController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type of jpg/jpeg or png"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

const router = Router();
const bookController = new BookController();

router.get("/fetchAll", bookController.fetchAll);
router.get("/:id", bookController.book);
router.post("/createBook", upload.single("image"), bookController.createBook);
router.put(
  "/updateBook/:id",
  upload.single("image"),
  bookController.updateBook
);
router.delete("/deleteBook/:id", bookController.deleteBook);

module.exports = router;
