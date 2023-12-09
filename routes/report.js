const express = require("express");
const router = express.Router();
const passport = require("passport");

//importing report controller
const { status } = require("../controllers/report");

//fetching all the reports
router.get(
  "/reports/:status",
  passport.authenticate("jwt", { session: false }),
  status
);

module.exports = router;
