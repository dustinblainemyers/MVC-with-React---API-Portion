const express = require('express'),
   router = express.Router();
  

   router.get('/instructor', async (req, res) => {
    const data = await joinPresentation.getAllPresentations();
    console.log("all presentations", data )
    console.log("data", data);

        res.render('template', {
            locals: {
                title: 'Join Presentation',
                data: data
            },
            partials: {
                partial: 'partial-join-presentation',
                nav: 'partial-nav-home'
            }
        })
        
})

   module.exports = router





