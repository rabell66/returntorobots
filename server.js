// IMPORTS
const express = require("express");
// const models = require("./models");
// const bodyParser = require("body-parser");
// const morgan =require('morgan');
const mustacheExpress = require("mustache-express");
const app = express();
const port = process.env.PORT || 8000;
const mongoClient = require("mongodb").MongoClient;
const ObjectId= require("mongodb").ObjectId;
const dbUrl = "mongodb://localhost:27017/effingrobots";

// MIDDLEWARE
app.use("/", express.static("./public"));
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", "./views");
app.use(express.static("views"));
// app.use(bodyParser.json());
// app.use(morgan("dev"));

let DB;
let TIYPEOPLE;

// ROUTES
mongoClient.connect(dbUrl, function(err, db) {
  if (err) {
    console.warn("Error connecting to database", err);
  }

  DB = db;
  TIYPEOPLE = db.collection("robots");
});

// app.get('/', function(req,res){ 
//     res.render('index');
// });
app.get("/", function(req, res){
 TIYPEOPLE.find({}).toArray(function(err, foundPeople) {
    if (err) {
      res.status(500).send(err);
    }
   res.render('index',{users: foundPeople});

  });
});

app.get("/user/:id", function(req, res){
  console.log(req.params)
   TIYPEOPLE.findOne({ _id:ObjectId(req.params.id)}, function(
    err,
    foundPerson
  ) {
    if (err) {
      res.status(500).send(err);
    }

    res.render('user',{results:foundPerson}
  );
});
});
app.get("/lookingforjob", function(req, res){
 TIYPEOPLE.find({job: null}).toArray(function(
    err,
    foundPerson
  ) {
    if (err) {
      res.status(500).send(err);
    }

    res.render('index',{users:foundPerson}
  );
});
});

app.get("/employed", function(req, res){
 TIYPEOPLE.find({job:{ $nin:[null]}}).toArray(function(
    err,
    foundPerson
  ) {
    if (err) {
      res.status(500).send(err);
    }

    res.render('index',{users:foundPerson}
  );
});
});


app.post("/users", function(req, res){
 
  var usersData = req.body;
  
  var newUser = models.users.build(usersData);
  newUser
  .save()
  .then(function(savedUser){
    res.send(savedUser);
  })
  .catch(function(err){
    res.status(500).send(err);
  });
  
  res.send(savedUser);
});

app.delete("/users/:id", function(req, res){
  models.users.destroy({
    where: {id: req.params.id}

  }).then(function(deletedUser){
    res.send(deletedUser)
  })
  .catch(function(err){
    res.status(500).send(err);
})
});

app.listen(8000, () => {
  console.log(`Server listening on port ${port}.`);
});

