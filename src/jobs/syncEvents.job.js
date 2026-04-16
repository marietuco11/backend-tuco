const cron = require("node-cron");

const importEvents = require("../services/importEvents.service");
const updateExpiredEvents = require("../services/eventStatus.service");
const deleteOldEvents = require("../services/deleteOldEvents.service");

async function runSync() {

  console.log("Starting Zaragoza sync");

  const importResult = await importEvents();

  const expiredCount = await updateExpiredEvents();

  const deletedCount = await deleteOldEvents();

  console.log("Sync finished", {
    imported: importResult.imported,
    updated: importResult.updated,
    expiredUpdated: expiredCount,
    deleted: deletedCount
  });

}

function startEventSync() {

  cron.schedule("0 */6 * * *", async () => {

    try {
      await runSync();
    } catch (err) {
      console.error("Sync error:", err);
    }

  });

  console.log("Event sync scheduled (every 6 hours)");

}

module.exports = {
  runSync,
  startEventSync
};