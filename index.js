var http = require("http");
var http = require('http');
var fs = require('fs');
var pg = require('pg');
var express = require('express');
var app = express();
var connectionString = process.env.DATABASE_URL || 'postgres://cmsc128:cmsc128@localhost:5432/cmsc128';
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

        var conString = process.env.DATABASE_URL || 'postgres://cmsc128:cmsc128@localhost:5432/cmsc128';
        var client = new pg.Client(conString);
        client.connect();

app.get('/',function(req,res,next){
res.sendfile('index.html');
});

console.log('req.body');
console.log(req.body);

res.writeHead(200, {'Content-Type': 'text/html'});
res.write(data);
res.end()

client.query("Insert into users (email,password,username) VALUES ('"+req.body.email+"','"+req.body.password+"','"+req.body.username+"')",function(err, result)
{
  if (err)
     throw err;
});

app.listen(8080);
console.log('MY LIBRARY app listening at port:3000');
