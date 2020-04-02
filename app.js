const express = require('express'),
es6Renderer = require('express-es6-template-engine'),
app = express();
const path = require('path');
app.use('/css',express.static(path.join(__dirname, 'public/css')));

//middle ware
app.engine('html',es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(3333, () => {
    console.log('Server running on port 3333');
})

const rootController = require('./routes/index')
const createPController = require('./routes/create-presentation')
const joinPController = require(`./routes/join-presentation`)


app.use('/', rootController);
app.use('/create-presentation', createPController);
app.use('/join-presentation', joinPController);

