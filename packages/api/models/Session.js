const { DataTypes } = require("sequelize");
const db = require("../lib/database");

const Session = db.define(
  "Session",
  {
    startDate: {
      type: DataTypes.DATE,
    },
    observerId: {
      type: DataTypes.BIGINT,
    },
    submitterId: {
      type: DataTypes.BIGINT,
    },
    actualObserverName: {
      type: DataTypes.STRING,
    },
    submittedBy: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.DOUBLE,
    },
    longitude: {
      type: DataTypes.DOUBLE,
    },
    elevation: {
      type: DataTypes.INTEGER,
    },
  },
  {}
);

module.exports = Session;
