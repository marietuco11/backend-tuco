const Event = require("../models/Event");

async function deleteOldEvents() {

  const now = new Date();

  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  const result = await Event.deleteMany({
    status: "expired",
    expiredAt: { $lt: twelveMonthsAgo }
  });

  return result.deletedCount;

}

module.exports = deleteOldEvents;