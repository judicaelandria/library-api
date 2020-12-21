const { Router } = require("express");
const { LoanController } = require("../controllers/LoanController");

const router = Router();
const loanController = new LoanController();

router.get("/fetchAll", loanController.fetchAll);
router.get("/:id", loanController.loan);
router.post("/createLoan", loanController.createLoan);
router.patch("/updateLoan/:id", loanController.updateLoan);
router.delete("/deleteLoan/:id", loanController.deleteLoan);

module.exports = router;
