require("dotenv/config");
const app = require("./app");
const db = require("./lib/database");
const { sleep } = require("./lib/util");
const { getSessions, seed } = require("./lib/seed");

const { API_PORT } = process.env;
const port = API_PORT || 3000;

start();

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.log(reason);
  process.exit(1);
});

process.on("SIGTERM", () => process.exit(0));

async function start() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`listening on ${port}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function connectDB(retries = 5) {
  try {
    await db.authenticate();
    await db.sync(true);
    await seed();
  } catch (err) {
    if (retries <= 0) {
      throw new Error(
        "Unable to connect! Check your database connection / credentials."
      );
    }
    console.log(`Failed to connect, retrying ${retries} more times...`);
    await sleep(2000);
    return connectDB(retries - 1);
  }
}
