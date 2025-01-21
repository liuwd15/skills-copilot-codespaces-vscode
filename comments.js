// create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var path = require('path');
var comments = require('./comments.json');
var chat = require('./chat.json');
var server = http.createServer(function(req, res){
  var url_parts = url.parse(req.url, true);
  var path = url_parts.pathname;
  
  if (path == '/') {
    fs.readFile('./index.html', function(error, data){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  } else if (path == '/comments.json') {
    fs.readFile('./comments.json', function(error, data){
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(data);
    });
  } else if (path == '/chat.json') {
    fs.readFile('./chat.json', function(error, data){
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(data);
    });
  } else if (path == '/submit') {
    if (req.method == 'POST') {
      var body = '';
      req.on('data', function(data){
        body += data;
      });
      req.on('end', function(){
        var post = qs.parse(body);
        comments.push(post);
        fs.writeFile('./comments.json', JSON.stringify(comments), function(){
          res.writeHead(302, {'Location': '/'});
          res.end();
        });
      });
    } else {
      res.writeHead(405, {'Content-Type': 'text/plain'});
      res.end('Method Not Allowed');
    }
  } else if (path == '/chat') {
    if (req.method == 'POST') {
      var body = '';
      req.on('data', function(data){
        body += data;
      });
      req.on('end', function(){
        var post = qs.parse(body);
        chat.push(post);
        fs.writeFile('./chat.json', JSON.stringify(chat), function(){
          res.writeHead(302, {'Location': '/'});
          res.end();
        });
      });
    } else {
      res.writeHead(405, {'Content-Type': 'text/plain'});
      res.end('Method Not Allowed');
    }
  } else {
    var filename = path.slice(1);
    fs.exists(filename, function(exists){
      if (exists) {
        fs.readFile(filename, function(error, data){