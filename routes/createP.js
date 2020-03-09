const express = require('express'),
   router = express.Router(),
   createPresentation = require('../models/presentation');


   router.get('/', (req, res) => {

        res.render('template', {
            locals: {
                title: 'Create Presentation'
            },
            partials: {
                partial: 'partial-create-presentation',
                nav: 'partial-nav-home'
                
            }
        })

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
        
})

   module.exports = router
