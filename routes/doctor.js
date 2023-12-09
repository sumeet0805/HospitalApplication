const express = require('express');
const router = express.Router();
const {createDoctor, createSession} = require('../controllers/doctor');

//register route
router.post("/doctors/register", createDoctor);

// login route
router.post('/doctors/login', createSession);
module.exports = router;