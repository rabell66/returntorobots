const express = require('express');
const app = express();
const port = 3000;
const localRouter = require('./router')
const mustacheExpress = require('mustache-express');
const data = require('./models/data.js');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './public');
app.use(express.static(__dirname + '/public'));
app.use("/", localRouter )

app.listen(port, function(){
    console.log('Stating app on Port: '+ port + '...');
});




