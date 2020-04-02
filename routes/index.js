const express = require('express'),
   router = express.Router();


   router.get('/', (req, res) => {

        res.send("Green Light Red Light").status(200);
   })


   module.exports = router