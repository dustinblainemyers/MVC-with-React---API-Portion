const express = require('express'),
   router = express.Router(),
   createPresentation = require('../models/presentation');



        router.post("/generate", async function(req, res, next) {
            console.log("req body:", req.body);
            const { instructor, presentation_name } = req.body;
            const lessonData = await createPresentation.addLesson(presentation_name, instructor)
            console.log(lessonData)
            res.sendStatus(200);
          
            
          
            // const user = new UserModel(null , lesson_name, instructor, null );
            // presentation url set to null for now. once id is returned it 
            // will be of format join-presentation/student/${entry.id}
            // user.addUser();
            // res.status(200).redirect("/");
          });

          router.get('/:user_email', async (req, res) => {
            const user_email = req.params.user_email;
            const data = await createPresentation.getHostedByUserEmail(user_email);
           
            console.log("data", data);
        
                res.send(data);
           });
        


   module.exports = router
