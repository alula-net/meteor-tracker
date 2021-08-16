const bodyParser = require("body-parser");
const compression = require("compression");
const Express = require("express");
const Path = require("path");
const app = Express();
const client = require("axios").create({
  baseURL: process.env.API_URL,
});
module.exports = app;
app.set("view engine", "pug");
app.set("views", Path.join(__dirname, "views"));

app.use(compression());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use("/assets", Express.static(Path.join(__dirname, "assets")));

app.get("/", async (req, res, next) => {
  try {
    const resp = await client.get("/api/sessions", {
      params: getOpts(req.query),
    });
    res.render("index", { data: resp.data.data, meta: resp.data.meta });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.render("error", {
    error: err,
    production: process.env.NODE_ENV === "production",
  });
});

function getOpts(query) {
  let limit = parseInt(query.limit || 100, 10);
  let page = parseInt(query.page || 0, 10);
  if (limit >= 250) {
    limit = 250;
  }
  if (isNaN(limit)) {
    limit = 50;
  }
  if (isNaN(page)) {
    page = 0;
  }
  return { limit, page };
}
