const express = require('express'),
es6Renderer = require('express-es6-template-engine'),
app = express();
const path = require('path');
app.use('/css',express.static(path.join(__dirname, 'public/css')));

app.engine('html',es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');



app.listen(3333, () => {
    console.log('Server running on port 3333');
})

const rootController = require('./routes/index')
const aboutController = require('./routes/login')

app.use('/', rootController);
app.use('/', aboutController);

