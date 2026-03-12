const Event = require("../models/Event");

async function updateExpiredEvents() {

  const now = new Date();

  const result = await Event.updateMany(
    {
      endDate: { $lt: now },
      status: "active"
    },
    {
      $set: { status: "expired" }
    }
  );

  return result.modifiedCount;

}

module.exports = updateExpiredEvents;