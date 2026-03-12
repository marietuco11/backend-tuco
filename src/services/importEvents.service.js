const Event = require("../models/Event");
const Zaragoza = require("./zaragoza.service");
const mapEvent = require("../models/eventMapper");
async function importEvents() {

  let start = 0;
  const rows = 50;
  let total = 1;
  let imported = 0;
  let updated = 0;

  while (start < total) {

    const data = await Zaragoza.getEvents(start, rows);

    total = data.totalCount;

    for (const rawEvent of data.result) {

      const mapped = mapEvent(rawEvent);

      const existing = await Event.findOne({
        externalId: mapped.externalId
      });

      if (!existing) {

        await Event.create(mapped);
        imported++;

      } else {

        await Event.updateOne(
          { externalId: mapped.externalId },
          { $set: mapped }
        );

        updated++;

      }

    }

    start += rows;

  }

  return {
    imported,
    updated
  };

}

module.exports = importEvents;