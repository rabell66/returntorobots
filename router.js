var express = require("express");
var router = express.Router();
var data = require('./models/data.js');


router.get('/', function(req,res){
  
    res.render('index',{users:data["users"]});
});
router.get('/user/:id', function(req,res){
   var employeenumber = req.params.id - 1;  
    var employee = data.users[employeenumber];
    res.render('user', {results: employee});
    
});
module.exports = router;