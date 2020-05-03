const config = require("../config");
const { host, database } = config;
const pgp = require("pg-promise")({
  query: function (e) {
    console.log("QUERY", e.query);
  },
});

/* putting the following options but I am not sure it is necessary . I believe it will consistently be 
 const options = {
  host: "localhost",
  database: "redgreen",
}; */
DATABASE = "redgreen";
const options = {
  host: host,
  database: database,
};

const db = pgp(options);

module.exports = db;
