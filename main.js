const express = require('express');
const app = express();
const port = 3000;

const mustacheExpress = require('mustache-express');
const data = require('./data.js');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './public');
app.use(express.static(__dirname + '/public'));
app.get('/', function(req,res){
  
    res.render('index',{users:data["users"]});
});
app.get('/user/:id', function(req,res){
   var employeenumber = req.params.id - 1;  
    var employee = data.users[employeenumber];
    res.render('user', {results: employee});
    
});

app.listen(port, function(){
    console.log('Stating app on Port: '+ port + '...');
});




