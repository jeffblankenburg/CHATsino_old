const Airtable = require("airtable");
const data = require("../data");
const keys = require("../keys");
const updateWagers = require("./updateWagers");

async function resolveBets(user, game, outcome) {
  //console.log(`GAME ${JSON.stringify(game)}`);
  const wagers = await data.getWagersByGame(game);
  let updateArray = [];
  let winnings = 0;
  console.log(`OUTCOME ${JSON.stringify(outcome)}`);
  for (var i = 0; i < wagers.length; i++) {
    let fields = {};

    if (outcome) {
      fields.Outcome = outcome.symbol;
      wagers[i].fields.Outcome = outcome;
      winnings += wagers[i].fields.Amount * outcome.odds;
    } else winnings -= wagers[i].fields.Amount;

    fields.Status = "Completed";
    wagers[i].fields.Status = "Completed";

    const wager = {
      id: wagers[i].fields.RecordId,
      fields: fields,
    };
    updateArray.push(wager);
  }
  console.log(`WINNINGS ${JSON.stringify(winnings)}`);
  const updatedUser = await data.updateBalance(user, winnings);
  const areWagersResolved = await updateWagers(updateArray);

  return { wagers: wagers, user: updatedUser };
}

module.exports = resolveBets;