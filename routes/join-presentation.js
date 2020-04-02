const express = require('express'),
   router = express.Router(),
   joinPresentation = require('../models/presentation');
   
   router.get('/', async (req, res) => {
    const data = await joinPresentation.getAllPresentations();
    console.log("all presentations", data )
    console.log("data", data);

        res.send(data);
   });
   



   module.exports = router
