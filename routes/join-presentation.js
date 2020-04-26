const express = require("express"),
  router = express.Router(),
  lights = require("../models/lights");

router.get("/:user_email", async (req, res) => {
  const user_email = req.params.user_email;
  const data = await lights.getLightByUserId(user_email);

  console.log("data", data);

  res.send(data);
});

router.get("/happypath/reallyhappy", async (req, res) => {
  const data = await lights.happyPath();

  console.log("data", data);

  res.send(data);
});

router.get("/aggregate/countall/:lesson_id?", async (req, res) => {
  const lesson_id = req.params.lesson_id;
  let countAll = await lights.aggregateCountAll(lesson_id);
  let countGreen = await lights.aggregateCountGreen(lesson_id);
  let lightColor;

  const allNumber = parseInt(countAll[0].count);
  const greenNumber = parseInt(countGreen[0].count);
  console.log("all ", countAll);
  console.log("green ", countGreen);
  console.log("all count", allNumber);
  console.log("green count", greenNumber);

  if (greenNumber / allNumber >= 0.5) {
    lightColor = "Green";
  } else {
    lightColor = "Red";
  }
  console.log("lightcolor", lightColor);

  res.send(lightColor);
});

router.post("/generate", async function (req, res, next) {
  console.log("req body:", req.body);
  const { users_id, access_key } = req.body;
  const lessonData = await lights.addLight(users_id, access_key);
  console.log(lessonData);
  res.sendStatus(200);
});

router.put("/lights/togglelight/:light_id?", async (req, res) => {
  const light_id = req.params.light_id;
  const data = await lights.toggleLight(light_id);

  console.log("data", data);

  res.send(data);
});

router.get("presentation-by-light/:lesson_id?", async (req, res) => {
  const lesson_id = req.params.lesson_id;
  const data = await lights.getPresentationByUserId(lesson_id);

  console.log("data", data);

  res.send(data);
});

module.exports = router;
