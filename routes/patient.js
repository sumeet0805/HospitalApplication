const express = require("express");
const router = express.Router();
const passport = require('passport');
const Patient = require("../models/patient");

//importing patient controller
const {
  register,
  createReport,
  allReports,
} = require("../controllers/patient");

// show all the patients route
router.get(
  "/patients",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const patient = await Patient.find({});
    return res.send(patient);
  }
);

//registering a patient
router.post(
  "/patients/register",
  passport.authenticate("jwt", { session: false }),
  register
);

//create patient report
router.post(
  "/patients/:id/create_report",
  passport.authenticate("jwt", { session: false }),
  createReport
);

//get all reports of a particular patient
router.get(
  "/patients/:id/all_reports",
  passport.authenticate("jwt", { session: false }),
  allReports
);

module.exports = router;
