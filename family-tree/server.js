var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var Promise = require('mpromise');
// REQUIRE & CONNECT MONGOOSE
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/family-tree');
// REQUIRE MODEL FILE
var User = require('./models/user');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Crud: Create
// var bob = new User( {
//   firstName: 'Bob',
//   email: 'bob@ga.co',
//   meta:{
//     age: 27
//   }
// });

// bob.sayHello();

// bob.save( function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('Bob Created');
//   }
// });

// var newUser = new User( {
//   firstName: 'gerry',
//   email: 'gerry@gmail.com',
//   password: 'password',
// });

// // save the user
// newUser.save( function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('User Created!');
//   }
// })

// cRud: Read
// Find All
User.find({}, function(err, users) {
  if(err) {
    console.log(err);
  } else {
    console.log(users);
  }
});

// Find One
User.find( {firstName: 'gerry'}, function(err, user) {
  if(err) {
    console.log(err);
  } else {
    console.log(user);
  }
});


// Find a user with ID of 1
User.findById(1, function(err, user) {
  if(err) {
    console.log(err);
  } else {
    console.log(user);
  }
});

// crUd: Update
User.findOneAndUpdate(
  {firstName: 'gerry'},
  {email: 'gerry3000@gmail.com'},
  function(err, user) {
  if(err) {
    console.log(err);
  } else {
    console.log(user);
  }
});

// cruD: Destroy
User.findOneAndRemove(
  { firsName: 'gerry'},
  function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('Gerry deleted');
    }
  });
