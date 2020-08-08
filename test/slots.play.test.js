const slots = require("../slots");

let user;

beforeAll(() => {
  user = resetUser();
  console.log(`USER ${JSON.stringify(user)}`);
});

test("User ID should match on return", async () => {
  const result = await slots.play(user, 10);
  expect(result.user.RecordId).toBe(user.RecordId);
});

// test("Wager should match on return", async () => {
//   const result = await slots.play(user, 10);
//   expect(result.wager).toBe(10);
// });

function resetUser() {
  return {
    fields: {
      RecordId: "reconrFfnURnb4e3R",
      AvailableBalance: 110,
      Balance: 110,
    },
  };
}
