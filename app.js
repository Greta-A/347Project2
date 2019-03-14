//var express = require("express");
//var app     = express();
//var path    = require("path");

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, '/public')))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('/public/index.html'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

//app.use(express.static(__dirname + '/public'));

/**
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen(3000);

console.log("Running at Port 3000");
*/