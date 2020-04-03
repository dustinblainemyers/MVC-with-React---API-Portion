const express = require('express'),
   router = express.Router(),
   lights = require('../models/lights');
   
   router.get('/:user_id?', async (req, res) => {
    const user_id = req.params.user_id;
    const data = await lights.getLightByUserId(user_id);
   
    console.log("data", data);

        res.send(data);
   });
   

   router.get('presentation-by-light/:lesson_id?', async (req, res) => {
    const lesson_id = req.params.user_id;
    const data = await lights.getPresentationByUserId(lesson_id);
   
    console.log("data", data);

        res.send(data);
   });


   


   module.exports = router
