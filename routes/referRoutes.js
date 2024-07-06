const express = require("express");
const router = express.Router();

const { sendEmail } = require("../controllers/referEmail");

router.post("/sendemail", sendEmail);

module.exports = router;
