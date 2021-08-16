require("dotenv/config");
const app = require("./app");

const { PORT } = process.env;
const port = PORT || 3001;

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.log(reason);
  process.exit(1);
});

process.on("SIGTERM", () => process.exit(0));

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
