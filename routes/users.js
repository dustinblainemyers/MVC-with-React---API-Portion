const express = require('express'),
   router = express.Router(),
   Users = require('../models/users');
   
   router.get('/', async (req, res) => {
    const data = await Users.getAllUsers();
    console.log("all users", data )
    console.log("data", data);

        res.send(data);
   });
   
   router.get('/:user_email?', async (req, res) => {
       const user_email = req.params.user_email;
       let data = await Users.getUser(user_email)
    //    console.log("searched user", data)
       if(data.name === 'QueryResultError') {
           data = await Users.addUser(user_email)
           console.log("added user", data)
       }
       
       res.send(data);
   });


   module.exports = router