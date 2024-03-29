const Airtable = require("airtable");
const keys = require("../keys");

async function createWager(user, wager, game) {
  const airtable = new Airtable({ apiKey: keys.airtable_api_key }).base(
    keys.airtable_base_data
  );
  return new Promise((resolve, reject) => {
    airtable("Wager").create(
      {
        UserId: [user.fields.RecordId],
        GameId: [game.fields.RecordId],
        Amount: wager,
        Status: "Active",
      },
      function (err, record) {
        if (err) {
          console.error(err);
          return;
        }
        resolve(record);
      }
    );
  });
}

module.exports = createWager;
