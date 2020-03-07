const express = require('express'),
   router = express.Router();


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
        
})

   module.exports = router
