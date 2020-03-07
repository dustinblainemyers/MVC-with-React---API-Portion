const express = require('express'),
   router = express.Router();


   router.get('/', (req, res) => {

        res.render('template', {
            locals: {
                title: 'Home'
            },
            partials: {
                partial: 'partial-index',
                nav: 'partial-nav-home'
                
            }
        })
        
})

   module.exports = router