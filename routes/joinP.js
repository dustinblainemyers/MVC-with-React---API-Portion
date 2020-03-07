const express = require('express'),
   router = express.Router();


   router.get('/', (req, res) => {

        res.render('template', {
            locals: {
                title: 'Join Presentation'
            },
            partials: {
                partial: 'partial-join-presentation',
                nav: 'partial-nav-home'
            }
        })
        
})

   module.exports = router
