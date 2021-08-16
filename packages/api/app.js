const bodyParser = require("body-parser");
const compression = require("compression");
const Express = require("express");
const app = Express();
const { Session } = require("./models");
const { Op } = require("sequelize");
module.exports = app;

app.use(compression());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ alive: true });
});

app.get("/api/sessions", async (req, res, next) => {
  try {
    const { limit, page } = getOpts(req.query);
    const sessions = await Session.findAndCountAll({
      limit: limit,
      offset: page * limit,
      where: {
        startDate: {
          [Op.ne]: null,
        },
      },
      order: [["startDate", "DESC"]],
    });
    res.json({
      meta: {
        total: sessions.count,
        page: page,
        limit: limit,
      },
      data: sessions.rows,
    });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "omitted" : err.stack,
  });
});

function getOpts(query) {
  let limit = parseInt(query.limit || 50, 10);
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
