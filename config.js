const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT,
  host: process.env.HOST,
  database: process.env.DATABASE,
  socketio: process.env.SOCKETIO,
};
