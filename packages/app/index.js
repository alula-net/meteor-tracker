require("dotenv/config");
const app = require("./app");

const { PORT } = process.env;
const port = PORT || 9001;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
