const express = require("express"),
  es6Renderer = require("express-es6-template-engine"),
  app = express();
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
const config = require("./config");

const { port } = config;
console.log(`Your port is ${port}`);

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
};

app.use(cors(corsOptions));
app.use("/css", express.static(path.join(__dirname, "public/css")));

//middle ware
app.engine("html", es6Renderer);
app.set("views", "views");
app.set("view engine", "html");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);

const io = socketIo(server);

const getApiAndEmit = async (socket, token) => {
  try {
    const res = await axios.get(
      `http://localhost:3333/join-presentation/aggregate/countall/${token}`
    );

    socket.emit("FromAPI", res.data);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

let intervals = [];

io.on("connection", (socket) => {
  let token = socket.handshake.query.token;
  console.log("New client connected", token);

  intervals.push({
    token: token,
    interval: setInterval(() => getApiAndEmit(socket, token), 1500),
  });
  console.log(intervals);
  socket.on("disconnect", () => {
    console.log("Client disconnected", token);
    intervals.map((interval) => {
      if (interval.token === token) {
        clearInterval(interval.interval);
      }
    });
  });
});

server.listen(4001, () => console.log(`Listening on port 4001`));

app.listen(3333, () => {
  console.log("Server running on port 3333");
});

const rootController = require("./routes/index");
const createPController = require("./routes/create-presentation");
const joinPController = require(`./routes/join-presentation`);
const userController = require(`./routes/users`);
const miscController = require(`./routes/misc-endpoints`);

app.use("/", rootController);

app.use("/create-presentation", createPController);
app.use("/join-presentation", joinPController);
app.use("/users", userController);
app.use("/misc-endpoints", miscController);
