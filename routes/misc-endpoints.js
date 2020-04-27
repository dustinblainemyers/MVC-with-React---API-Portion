const express = require("express"),
  router = express.Router(),
  lights = require("../models/lights");

router.get("/:user_id?", async (req, res) => {
  const user_email = req.params.user_email;
  const data = await lights.viewUnjoined(user_email);

  console.log("data", data);

  res.send(data);
});

module.exports = router;
