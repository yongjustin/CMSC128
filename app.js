var http = require("http");
var http = require('http');
var fs = require('fs');
var pg = require('pg');
var express = require('express');
var ejs = require('ejs');
var app = express();
var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({extended: false});
var db_connection = "postgres://cmsc128:cmsc128@localhost:5432/cmsc128";
//postgres://user:password@localhost/dbname
var session = require('express-session')

app.use(session({
  secret: 'the struts',
  resave: false,
  saveUninitialized: true
}))

app.get('/',function(req,res,next){
res.sendFile(__dirname + '/index.html');
});

app.get('/sign-up', function(req,res){
    res.sendFile('/welcomepage.html', {root: __dirname});
});

app.get('/loginsuccess', mid.requiresLogin, function(req,res){
    res.sendFile('/homepage.html', {root: __dirname});
});

app.get('/back-to-home', function (req, res,html) {
 res.sendFile(__dirname+'/index.html');
});

app.post('/signup', urlencodedparser, function(req,res){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var signup_client = new pg.Client(db_connection);
    signup_client.connect(function (err){
    if(err){
    console.log('Could not connect to postgresql on signup',err);
    }
    else{
    signup_client.query('INSERT INTO users(email,password,username) VALUES ($1,$2,$3)',
    [email,password,username], function (err){
    if(err){
     console.log('Insert error in signup', err);
    }
    else{
     console.log('Signup Success');
     res.redirect('/sign-up');
     signup_client.end();
     }
    });
     }
    });
});

app.post('/back-to-home', function (req, res,html) {
 res.redirect('/back-to-home');
});


app.post('/login', urlencodedparser, function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    var login_client = new pg.Client(db_connection);
    login_client.connect(function (err){
     if(err){
       console.log('Could not connect to postgresql on signup',err);
     }
     else{
       login_client.query('SELECT * FROM users WHERE email=$1 AND password=$2 LIMIT 1',
    [email,password], function (err, result){
    if(err) {
     console.log('Insert error in signup', err);
    }
    else{
     if(result.rows.length!=0){
      res.redirect('/loginsuccess');
      login_client.end();
     }
     else{
      res.redirect('/loginsuccess');
      login_client.end();
      }
     }
    });
    }
    });
});

app.post('/archive', urlencodedparser, function(req,res){
  var genre = req.body.genre;
  var file = req.body.file;
  var client =  new pg.Client(db_connection);
  client.query('INSERT INTO files(username,email,file,genre) VALUES ($1,$2,$3,$4)',
  [username,file,genre], function (err){
  if(err){
   console.log('error adding file', err);
  }
  else{
   console.log('Archived!');
   res.redirect('/loginsuccess');
    }
  });
 });

app.listen(8080);
console.log('MY LIBRARY app listening at port:8080');
