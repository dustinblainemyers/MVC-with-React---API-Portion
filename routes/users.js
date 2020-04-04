const express = require('express'),
   router = express.Router(),
   Users = require('../models/users');
   
   router.get('/', async (req, res) => {
    const data = await Users.getAllUsers();
    console.log("all users", data )
    console.log("data", data);

        res.send(data);
   });
   



   module.exports = router