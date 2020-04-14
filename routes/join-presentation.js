const express = require('express'),
   router = express.Router(),
   lights = require('../models/lights');
   
   router.get('/:user_email', async (req, res) => {
    const user_email = req.params.user_email;
    const data = await lights.getLightByUserId(user_email);
   
    console.log("data", data);

        res.send(data);
   });
   

   router.get('presentation-by-light/:lesson_id?', async (req, res) => {
    const lesson_id = req.params.user_id;
    const data = await lights.getPresentationByUserId(lesson_id);
   
    console.log("data", data);

        res.send(data);
   });

   router.get('/happypath/reallyhappy', async (req, res) => {
    
    const data = await lights.happyPath();
   
    console.log("data", data);

        res.send(data);
   });


   


   module.exports = router
