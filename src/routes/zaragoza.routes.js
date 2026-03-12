const express = require("express");
const router = express.Router();
const controller = require("../controllers/zaragoza.controller");

router.get("/events", controller.getEvents);
router.get("/events/today", controller.getToday);
router.get("/events/search", controller.search);
router.get("/events/:id", controller.getEvent);

router.post("/import", controller.importFromZaragoza);

router.post("/sync", controller.manualSync);

module.exports = router;