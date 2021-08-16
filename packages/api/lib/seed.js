const Csv = require("csv-parser");
const Fs = require("fs");
const Path = require("path");
const { camelize } = require("inflection");
const { Session } = require("../models");
function getSessions(year) {
  return new Promise((resolve) => {
    const results = [];
    Fs.createReadStream(Path.resolve(__dirname, `../data/${year}/sessions.csv`))
      .pipe(
        Csv({
          mapHeaders: ({ header }) => {
            const headerName = camelize(header.replace(/ /g, ""), true);
            if (headerName == "sessionID") {
              return "id";
            }
            if (headerName == "observerID") {
              return "observerId";
            }
            if (headerName == "submitterID") {
              return "submitterId";
            }
            if (headerName == "submittedby") {
              return "submittedBy";
            }

            return headerName;
          },
          mapValues: ({ header, index, value }) => {
            if (value === "") {
              return null;
            }
            return value;
          },
        })
      )
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results));
  });
}

async function seed() {
  const seeded = await Session.findOne();
  if (seeded) {
    return;
  }

  let sessions = [];
  for (let page of [2020, 2021]) {
    const items = await getSessions(page);
    sessions = sessions.concat(items);
  }

  try {
    console.log(`inserting ${sessions.length} sessions.`);
    await Session.bulkCreate(sessions);
    const inserted = await Session.count();
    console.log(`inserted ${inserted} sessions.`);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getSessions,
  seed,
};
