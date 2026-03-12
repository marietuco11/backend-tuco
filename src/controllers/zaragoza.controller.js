const Zaragoza = require("../services/zaragoza.service");
const importEvents = require("../services/importEvents.service");
const { runSync } = require("../jobs/syncEvents.job");


const getEvents = async (req, res, next) => {

  try {
    const { start = 0, rows = 10 } = req.query;
    const data = await Zaragoza.getEvents(start, rows);

    res.json(data);

  } catch (error) {
    next(error);
  }
};

const getEvent = async (req, res, next) => {

  try {
    const data = await Zaragoza.getEventById(req.params.id);
    res.json(data);

  } catch (error) {
    next(error);
  }
};

const getToday = async (req, res, next) => {

  try {
    const data = await Zaragoza.getTodayEvents();
    res.json(data);

  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {

  try {
    const { text } = req.query;
    const data = await Zaragoza.searchEvents(text);

    res.json(data);

  } catch (error) {
    next(error);
  }
};


const importFromZaragoza = async (req, res, next) => {

  try {

    const result = await importEvents();

    res.json({
      success: true,
      ...result
    });

  } catch (err) {

    next(err);

  }

};

const manualSync = async (req, res, next) => {

  try {

    await runSync();

    res.json({
      success: true,
      message: "Sync executed"
    });

  } catch (err) {

    next(err);

  }

};

module.exports = {
  getEvents,
  getEvent,
  getToday,
  search,
  importFromZaragoza,
  manualSync
};