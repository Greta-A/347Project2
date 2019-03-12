var express = require("express");
var app     = express();
var path    = require("path");

app.use(express.static(__dirname + '/public'));

// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/index.html'));
// });

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// var dir = path.join(__dirname, 'public');
//
// app.use(express.static(dir));

app.listen(3000);

console.log("Running at Port 3000");
