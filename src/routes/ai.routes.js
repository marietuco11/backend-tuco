const express = require("express");
const router = express.Router();

const { getSummary } = require("../controllers/ai.controller");

router.post("/summary", getSummary);

module.exports = router;