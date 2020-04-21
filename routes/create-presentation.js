const express = require('express'),
   router = express.Router(),
   createPresentation = require('../models/presentation');



        router.post("/generate", async function(req, res, next) {
            console.log("req body:", req.body);
            const { instructor, presentation_name } = req.body;
            const lessonData = await createPresentation.addLesson(presentation_name, instructor)
            console.log(lessonData)
            res.sendStatus(200);
          
            
          
          });

          router.get('/:user_email', async (req, res) => {
            const user_email = req.params.user_email;
            const data = await createPresentation.getHostedByUserEmail(user_email);
           
            console.log("data", data);
        
                res.send(data);
           });
        


   module.exports = router
