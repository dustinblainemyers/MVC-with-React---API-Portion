const express = require('express'),
   router = express.Router();


router.get('/login', (req, res) => {

        res.render('template', {
            locals: {
                title: 'Login'
            },
            partials: {
                partial: 'partial-login',
                
            }
        })
        
})

router.post('/login', function(req,res) {
    console.log('req body:', req.body) ;
    res.sendStatus(200);
  });

   module.exports = router