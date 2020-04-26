const express = require("express"),
  router = express.Router(),
  createPresentation = require("../models/presentation");

router.get("/:user_email", async (req, res) => {
  const user_email = req.params.user_email;
  const data = await createPresentation.getHostedByUserEmail(user_email);

  console.log("data", data);

  res.send(data);
});

router.post("/generate/hello", async function (req, res, next) {
  console.log("req body:", req.body);
  const { presentation_name } = req.body;
  const { user_id } = req.body;
  const { accessKey } = req.body;
  const lessonData = await createPresentation.addLesson(
    presentation_name,
    user_id,
    accessKey
  );
  console.log(lessonData);

  if (lessonData.name === "error") {
    res.send("There was a problem creating the lesson", 400);
  } else {
    res.sendStatus(200);
  }
});

router.delete("/delete", async function (req, res, next) {
  console.log("req body:", req.body);

  const { lesson_id } = req.body;
  const lessonData = await createPresentation.deleteLesson(lesson_id);
  console.log(lessonData);

  res.sendStatus(200);
});

module.exports = router;
