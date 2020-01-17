const { User } = require('../database/models');

const users = require('../data/users'); // 51 players;

const populateUsersTable = async (users) => {

    let user1 = await User.create(users[0]);
    let user2 = await User.create(users[1]);
    let user3 = await User.create(users[2]);
}

const seedDatabase = async () => {
  try {
    await populateUsersTable(users);
    console.log("Successfully seeded!");
    process.exit(0);
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedDatabase();
