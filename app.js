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
const { socketio } = config;
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

const getApiAndEmit = async (socket, token, compareData) => {
  try {
    let res = await axios.get(
      `${socketio}/join-presentation/aggregate/countall/${token}`
    );
    if (res.data !== compareData) {
      dataChangeCount++;
      console.log("compare data", compareData);
      console.log("res data", res.data);
      socket.emit("FromAPI", res.data);
      console.log(
        `Data has changed  times ${dataChangeCount}, sending to client`
      );
      intervals.map((interval) => {
        if (interval.token === token) {
          clearInterval(interval.interval);
          interval.interval = setInterval(
            () => getApiAndEmit(socket, token, res.data),
            1000
          );
        }
      });
    }
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
let dataChangeCount = 0;
let intervals = [];

io.on("connection", (socket) => {
  let token = socket.handshake.query.token;
  console.log("New client connected", token);
  const res = { data: null };
  let dataChangeCount = 0;
  intervals.push({
    token: token,
    interval: setInterval(() => getApiAndEmit(socket, token, res.data), 1000),

    //add a time limit here ?
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", token);
    dataChangeCount = 0;
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
